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
  Container,
} from "reactstrap";

// core components
import TCNavbar from "components/Navbars/TCNavbar.js";
import AppLanding from "views/AppComponents/AppLanding.js";
import AppSearching from "views/AppComponents/AppSearching.js";
import AppChatroom from "views/AppComponents/AppChatroom.js";

const MODES = {
  LANDING: 0,
  SEARCHING: 1,
  IN_ROOM: 2,
  ALREADY_CONNECTED: 3,
}

class App extends React.Component {
  state = { mode: MODES.LANDING, socket: null, messages: [], uid: Math.random().toString(36).substr(2, 10), msgInput: "", alreadyConnected:false };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.initSocket()
  }

  componentWillUnmount() {
    this.state.socket.close()
  }

  initSocket() {
    console.log(process.env.REACT_APP_API_ENDPOINT)
    const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT, { withCredentials: true });
    this.setState({ socket: socket })

    socket.on("match", data => {
      this.handleMatch(data);
    });

    // detect incoming "chat message" event and write to page
    socket.on('message', msg => {
      this.handleMessage(msg)
    });

    // detect if we are not logged in
    socket.on('no-login', () => {
      // redirect to login
      window.location.href = process.env.REACT_APP_API_ENDPOINT + "/login";
    });

    // detect if we are already connected in a different window/broswer/device
    socket.on('already-connected', () => {
      console.log('Already connected')
      this.setState({alreadyConnected: true})
      this.state.socket.close()
    });
  }

  onRouteChanged() {
    alert("CLOSING SOCKET")
    this.state.socket.close()
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

  sendMessage(msg) {
    this.state.socket.emit("message", msg)
  }

  handleMessage(msg) {
    console.log(`Received message ${msg}`)

    // append to messages list
    this.setState({ messages: [...this.state.messages, { id: msg.id, sender_uid: msg.sender_uid, text: msg.text }] })
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    //TODO: FIX ME
    // this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  getUID = () => {
    return this.state.uid
  }

  AppCard() {
    var mode = this.state.mode
    if (mode == MODES.LANDING) {
      return (
        <AppLanding handleClick={e => this.findMatch(e)} alreadyConnected={this.state.alreadyConnected}/>
      );
    } else if (mode == MODES.SEARCHING) {
      return (
        <AppSearching />
      );
    } else if (mode == MODES.IN_ROOM) {
      // https://www.freecodecamp.org/news/building-a-modern-chat-application-with-react-js-558896622194/
      return (
        <AppChatroom messages={this.state.messages} sendMessage={(msg) => this.sendMessage(msg)} getUID={this.getUID} />
      )
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
