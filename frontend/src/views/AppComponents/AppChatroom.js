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

class AppChatroom extends React.Component {
  state = {
    parentState: this.props.parentState,
    msgInput: "",
    otherDisconnected: this.props.otherDisconnected,
    electedReveal: false, 

    // reveal banner
    revealBannerOn: false,
    shownRevealBanner: false,
    // DC handlers
    dcStartTime: -1,
    secondsTil: -1
  };

  constructor(props) {
    super(props)
  }
  // code to run after render
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  updateTimer() {
    // compute countdown timer
    var elapsed = Math.round(new Date().getTime() / 1000 - this.state.dcStartTime);
    this.setState({ secondsTil: (60 - elapsed) });

    // on zero, check if other person is still disconnected
    if (this.state.secondsTil <= 0) {
      if (this.state.otherDisconnected() && this.state.dcStartTime > 0) {
        // redirect back to app
        window.location.href = "/app";
        return;
      } else {
        console.log("Aborted timer")
        clearInterval(this.timer)
      }
    }
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

  // handle submission of text
  onKeyDown(event) {
    if (event.key === 'Enter' && this.state.msgInput !== "") {
      console.log(this.state)
      // emit to 
      var message = { sender_uid: this.props.getUserId(), text: this.state.msgInput }
      this.setState({ msgInput: "" })
      this.props.sendMessage(message)
    }
  }

  OtherDisconnectedBanner = () => {
    // run on state change
    useEffect(() => {

      if (this.state.otherDisconnected()) {
        if (this.state.dcStartTime === -1) {
          // just dc'd, wil reflect now in state

          console.log(this.state)
          // sets dc time to second epoch
          this.state.dcStartTime = Math.round(new Date().getTime() / 1000);

          console.log("Disconnected at: " + this.state.dcStartTime);

          // 60 seconds to reconnect
          this.setState({ secondsTil: 60 })
          this.timer = setInterval(() => this.updateTimer(), 1000)
        }
      } else {
        // clear interval if it exists
        if (this.timer) {
          clearInterval(this.timer)
        }
      }
    });

    if (this.state.dcStartTime == -1) {
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


  RevealedBanner = () => {
    // run on state change
    useEffect(() => {
      if (this.props.isRevealed() && !this.state.shownRevealBanner) {
        // show reveal banner
        this.setState({ revealBannerOn: true, shownRevealBanner: true })

        // set timeout to eventually hide banner
        setTimeout(() => this.setState({ revealBannerOn: false }), 5000)
      }
    });

    if (this.state.revealBannerOn) {
      // TODO: animations to show and hide
      return (<>
        <Alert color="success">
          <strong>You've both revealed!</strong> You're currently talking to {this.props.otherNetid()}.
      </Alert>
      </>);
    }
    return (null)
  }

  render() {
    return (
      <>
        <Card className="shadow border-0 app-card">
          <this.OtherDisconnectedBanner />
          <this.RevealedBanner />
          <CardBody className="py-md align-items-center">
            <Row className="row-grid justify-content-center align-items-center">
              <h6 className="text-orange text-uppercase">
                YOU'RE CHATTING!
            </h6>
            </Row>

            <div className="chatWindow">
              <ul className="chat" id="chatList">
                { // writes out all messages
                  this.props.messages.map(data => (
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
                              <p>{this.props.otherNetid()}</p>
                              <div className="message"> {data.text} </div>
                            </div>
                          </li>
                        )}
                    </div>
                  ))}
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
                className={"mt-4 " + (this.state.electedReveal ? "disabled" : "")}
                color="orange"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ electedReveal: true })
                  // TODO: enable cancel reveal
                  this.props.handleElectReveal(true);
                }} >
                Reveal your identity
              </Button>
            </Row>
          </CardBody>
        </Card>
      </>);
  }
}

export default AppChatroom;
