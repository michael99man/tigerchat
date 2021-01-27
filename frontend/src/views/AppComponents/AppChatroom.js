import React, { useEffect } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Input,
  Row,
  Alert,
  Button,
} from "reactstrap";

// import { Dot } from 'react-animated-dots';

const TYPING_TIMEOUT = 3000;

class AppChatroom extends React.Component {
  state = {
    messages: [],
    msgInput: "",
    
    // reveal state
    electedReveal: false,
    revealed: false,
    otherNetid: null,

    // reveal banner
    revealBannerOn: false,
    shownRevealBanner: false,
    // DC handlers
    dcStartTime: -1,
    secondsTil: -1,

    iAmTyping: false,

    // display is typing message
    otherIsTyping: false,
  };

  constructor(props) {
    super(props)

    // set reveal event handler
    this.props.socket.on("reveal", otherNetid => {
      this.handleReveal(otherNetid)
    });

    // detect incoming "chat message" event and write to page
    this.props.socket.on('message', msg => {
      console.log(`Received message ${msg}`)
      // append to messages list
      this.setState({ messages: [...this.state.messages, { id: msg.id, sender_uid: msg.sender_uid, text: msg.text }] })

      // if sender is other person, changes favicon to notif
      if (msg.sender_uid !== this.props.getUserId()) {
        document.getElementById('tabicon').href = "favicon-notif/favicon.ico";
      }

      // changes favicon back to original
      function switchBack() {
        document.getElementById('tabicon').href = "favicon/favicon.ico";
       }

      // after clicking anywhere on screen, change favicon back
      document.onclick = function(){switchBack();};

    });

    // detect when the other person is typing
    this.props.socket.on('is-typing', (data) => {
      if (data.user_id !== this.props.getUserId()){
        // ignore info about ourselves
        this.setState({ otherIsTyping: data.is_typing })
        console.log(`Other person is typing (${data.is_typing})`)
      }
    });
  }

  // code to run after render
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }


  /*
   * OTHER DISCONNECTED LOGIC
   */

  updateBootTimer() {
    // compute countdown timer
    var elapsed = Math.round(new Date().getTime() / 1000 - this.state.dcStartTime);
    this.setState({ secondsTil: (60 - elapsed) });

    // on zero, check if other person is still disconnected
    if (this.state.secondsTil <= 0) {
      if (this.props.otherDisconnected() && this.state.dcStartTime > 0) {
        // redirect back to app
        window.location.href = "/app";
        return;
      } else {
        console.log("Aborted timer")
        clearInterval(this.timer)
      }
    }
  }

  OtherDisconnectedBanner = () => {
    // run on state change
    useEffect(() => {
      if (this.props.otherDisconnected()) {
        if (this.state.dcStartTime === -1) {
          // just dc'd, wil reflect now in state

          console.log(this.state)
          // sets dc time to second epoch
          this.setState({ dcStartTime: Math.round(new Date().getTime() / 1000) });

          console.log("Disconnected at: " + this.state.dcStartTime);

          // 60 seconds to reconnect
          this.setState({ secondsTil: 60 })
          this.timer = setInterval(() => this.updateBootTimer(), 1000)
        }
      } else {
        // clear interval if it exists
        if (this.timer) {
          clearInterval(this.timer)
        }
      }
    });

    if (this.state.dcStartTime === -1) {
      // no other-dc banner
      return (null);
    } else {
      return (<>
        <Alert color="danger">
          <strong>Connection error!</strong> Your partner has disconnected. Leaving chat in {this.state.secondsTil} seconds.
      </Alert>
      </>);
    }
  }

  /*
   * REVEAL LOGIC
   */

  RevealedBanner = () => {
    // run on state change
    useEffect(() => {
      if (this.state.revealed && !this.state.shownRevealBanner) {
        // show reveal banner
        this.setState({ revealBannerOn: true, shownRevealBanner: true })

        // set timeout to eventually hide banner
        setTimeout(() => this.setState({ revealBannerOn: false }), 10000)
      }
    });

    if (this.state.revealBannerOn) {
      // TODO: animations to show and hide
      return (<>
        <Alert color="success">
          <strong>You've both revealed!</strong> You're currently talking to {this.state.otherNetid}.
      </Alert>
      </>);
    }
    return (null)
  }

  // elects into the reveal mechanism or opting out
  handleElectReveal(doReveal) {
    if (doReveal) {
      console.log(`Electing to reveal my identity`)
    } else {
      console.log("Electing to not reveal my identity")
    }
    this.props.socket.emit("elect-reveal", doReveal)
  }

  // revealed and netid is known
  handleReveal(otherNetid) {
    console.log(`Received identity! The stranger is ${otherNetid}`)
    this.setState({ revealed: true, otherNetid })
  }

  /*
   * LEAVE BUTTON
   */
   leaveChat = () => {
    this.props.socket.disconnect(); // close socket connection to server
     this.props.socket.on('disconnect', () => {
       console.log("User has disconnected")
     });
     // TODO: FIXME!!!!!
    //this.setState(APP_MODES.LANDING
   }

  /*
   * MESSAGING LOGIC
   */
  sendMessage(msg) {
    // TODO: add emoji, other data support
    this.props.socket.emit("message", msg)
  }

  // process changes to our input field 
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  stoppedTyping = () => {
    this.setState({ iAmTyping: false });
    this.props.socket.emit("im-typing", false)
  }

  // handle submission of text
  onKeyDown(event) {
    if (event.key === 'Enter' && this.state.msgInput !== "") {
      console.log(this.state)
      // emit to server
      var message = { sender_uid: this.props.getUserId(), text: this.state.msgInput }
      this.setState({ msgInput: "" })
      this.sendMessage(message)

      // cancel typing timeout and trigger stoppedTyping
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.stoppedTyping()
    } else {
      
      // if not currently typing, set to true
      if (!this.state.iAmTyping) {
        this.setState({ iAmTyping: true });
        // broadcast typing message
        this.props.socket.emit("im-typing", true)
      }

      // restart timeout function
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(this.stoppedTyping, TYPING_TIMEOUT)
    }
  }

  render() {
    return (
      <>
        <Card className="shadow border-0 app-card">
          <this.OtherDisconnectedBanner />
          <this.RevealedBanner />
          <CardBody className="py-md align-items-center">
            <Row className="row-grid justify-content-center">
                <Button
                  className="mt-4"
                  color="gray" 
                  onclick ={e => this.leaveChat()}
                  href={process.env.REACT_APP_API_ENDPOINT + "/login"} >
                 Leave conversation </Button>
              </Row>

            <Row className="row-grid justify-content-center align-items-center">
              <h6 className="text-orange text-uppercase">
                YOU'RE CHATTING!
            </h6>
            </Row>

            <div className="chatWindow">
              <ul className="chat" id="chatList">
                { // writes out all messages
                  this.state.messages.map(data => (
                    <div key={data.id}>
                      {this.props.getUserId() === data.sender_uid ? (
                        <li className="self-msg" key={data.id}>
                          <div className="msg">
                            <p>You</p>
                            <div className="message"> {data.text}</div>
                          </div>
                        </li>
                      ) : (
                          <li className="other-msg" key={data.id}>
                            <div className="msg">
                              <p>{this.state.otherNetid === null ? "Stranger" : this.state.otherNetid}
                              </p>
                              <div className="message"> {data.text} </div>
                            </div>
                          </li>
                        )}
                    </div>
                  ))}
                
                {this.state.otherIsTyping ? ( 
                  <div>
                      <li className="other-msg typing-msg">
                        <div className="msg">
                          <p>{this.state.otherNetid === null ? "Stranger" : this.state.otherNetid}</p>
                          <div className="message"> is typing... </div>
                        </div>
                      </li>
                  </div>
                ): (null)}
                        
                {/* allows us to scroll down */}
                <div style={{ float: "left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }}>
                </div>
              </ul>

              {/*
                  <div className="chatInputWrapper">
                    <form onSubmit={this.handleSubmit}>
                      <input
                        className="textarea input"
                        type="text"
                        placeholder="Enter your message..."
                        onChange={this.handleChange}
                      />
                  </form>
                  </div>
                  */}

            </div>
            <Input
              className="msg-input"
              placeholder="Text your message here"
              type="text"
              name="msgInput"
              onChange={e => this.handleInputChange(e)}
              onKeyDown={e => this.onKeyDown(e)}
              value={this.state.msgInput}
            />

            <Row className="row-grid justify-content-center">
              <Button
                className="mt-4"
                color="orange"
                onClick={e => {
                  e.preventDefault();
                  // flip the elect state
                  this.handleElectReveal(!this.state.electedReveal);
                  this.setState({ electedReveal: !this.state.electedReveal })
                }} >
                {this.state.electedReveal ? "Cancel Reveal" : "Reveal your identity"}
              </Button>
            </Row>
          </CardBody>
        </Card>
      </>);
  }
}

export default AppChatroom;
