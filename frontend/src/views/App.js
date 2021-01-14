/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import socketIOClient from "socket.io-client";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";


import { Dot } from 'react-animated-dots';
// core components
import TCNavbar from "components/Navbars/TCNavbar.js";
import CardsFooter from "components/Footers/CardsFooter.js";


const ENDPOINT = "http://127.0.0.1:1738";

const MODES = {
  LANDING: 0,
  SEARCHING: 1,
  IN_ROOM: 2,
}

class App extends React.Component {
  state = { mode: MODES.LANDING, socket: null, messages: [], uid: Math.random().toString(36).substr(2, 10), msgInput: "" };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.initSocket()
  }

  initSocket() {
    const socket = socketIOClient(ENDPOINT, { withCredentials: true });

    socket.on("match", data => {
      this.handleMatch(data);
    });

    // detect incoming "chat message" event and write to page
    socket.on('message', msg => {
      this.handleMessage(msg)
    });

    this.setState({ socket: socket })
  }

  // begin searching for a match
  findMatch(e) {
    e.preventDefault();
    this.setState({ mode: MODES.SEARCHING })

    this.state.socket.emit("find-match")
  }

  handleMatch(other) {
    console.log(`Matched with ${other}`)
    this.setState({ mode: MODES.IN_ROOM })
  }

  handleMessage(msg) {
    console.log(`Received message ${msg}`)

    // append to messages list
    this.setState({ messages: [...this.state.messages, { id: msg.id, sender_uid: msg.sender_uid, text: msg.text }] })
    this.scrollToBottom()
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
      var message = { sender_uid: this.state.uid, text: this.state.msgInput }
      this.setState({ msgInput: "" })
      this.state.socket.emit("message", message)
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  AppCard() {
    var mode = this.state.mode

    if (mode == MODES.LANDING) {
      return (
        <>
          <Card className="shadow border-0 app-card">
            <CardBody className="py-xl align-items-center">

              <Row className="row-grid justify-content-center align-items-center">
                <h6 className="text-orange text-uppercase">
                  Chat with a random Tiger!
          </h6>
              </Row>

              <Row className="row-grid justify-content-center">
                <Button
                  className="mt-4"
                  color="orange"
                  onClick={e => this.findMatch(e)}
                >
                  Find match
          </Button>
              </Row>
            </CardBody>
          </Card>
        </>
      );
    } else if (mode == MODES.SEARCHING) {
      return (
        <>
          <Card className="shadow border-0 app-card">
            <CardBody className="py-xl align-items-center">
              <Row className="row-grid justify-content-center align-items-center">
                <h6 className="text-orange text-uppercase">
                  Chat with a random Tiger!
            </h6>
              </Row>

              <Row className="row-grid justify-content-center">
                <Button
                  className="mt-4 disabled"
                  color="orange"
                  onClick={e => e.preventDefault()}
                >
                  SEARCHING
                    <Dot>.</Dot>
                  <Dot>.</Dot>
                  <Dot>.</Dot>
                </Button>
              </Row>
            </CardBody>
          </Card>
        </>);
    } else if (mode == MODES.IN_ROOM) {
      // https://www.freecodecamp.org/news/building-a-modern-chat-application-with-react-js-558896622194/
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
                  {this.state.messages.map(data => (
                    <div key={data.id}>
                      {this.state.uid === data.sender_uid ? (
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
    return (
      <>
        <div>INVALID STATE</div>
        <div>{JSON.stringify(mode)}</div>
      </>
    )
  }

  render() {
    return (
      <>
        <TCNavbar />
        <main ref="main">
          <div className="position-relative">
            {/* shape Hero */}
            <section className="section section-lg section-shaped fullscreen">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex justify-content-center mt-5">

                {/* Show different card content based on state */}
                {this.AppCard()}
              </Container>
            </section>
            {/* 1st Hero Variation */}
          </div>
        </main>
      </>
    );
  }
}


export default App;
