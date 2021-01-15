import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  Input,
  Row,
} from "reactstrap";

class AppChatroom extends React.Component {
  state = { msgInput: "" };

  constructor(props) {
    super(props)
  }
  // code to run after render
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
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
      var message = { sender_uid: this.props.getUID(), text: this.state.msgInput }
      this.setState({ msgInput: "" })

      this.props.sendMessage(message)
    }
  }

  render() {
    return (
      <>
        <Card className="shadow border-0 app-card">
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
                      {this.props.getUID() === data.sender_uid ? (
                        <li className="self-msg" key={data.id}>
                          <div className="msg">
                            <p>You</p>
                            <div className="message"> {data.text}</div>
                          </div>
                        </li>
                      ) : (
                          <li className="other-msg" key={data.id}>
                            <div className="msg">
                              <p>Stranger</p>
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

          </CardBody>
        </Card>
      </>);
  }
}

export default AppChatroom;
