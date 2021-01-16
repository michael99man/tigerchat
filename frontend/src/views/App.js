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
import { Prompt } from 'react-router'
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

import {APP_MODES, SYSTEM_MESSAGES} from "views/Constants.js"

class App extends React.Component {
  state = {
    mode: APP_MODES.LANDING,
    socket: null, messages: [],
    uid: Math.random().toString(36).substr(2, 10),
    // contents of input field
    msgInput: "",
    // bool representing whether another socket connection active
    alreadyConnected: false,
    // bool representing whether other user has disconnected
    otherDisconnected: false,

    // my profile information
    profile: null,
  };

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.initSocket()
  }

  componentWillUnmount() {
    this.state.socket.close()
  }

  componentDidUpdate() {
    // prevent user from accidentally refreshing while in a chat
    if (this.state.mode == APP_MODES.IN_ROOM && !this.state.otherDisconnected) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  }

  initSocket() {
    console.log(process.env.REACT_APP_API_ENDPOINT)
    const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT, { withCredentials: true });
    this.setState({ socket: socket })

    // receive information about myself
    socket.on("profile", data => {
      this.setState({ profile: data });
    });

    socket.on("match", data => {
      this.handleMatch(data)
    });

    // detect incoming system event to handle disconnections
    socket.on('system', msg => {
      this.handleSystemMessage(msg)
    });
    // detect incoming "chat message" event and write to page
    socket.on('message', msg => {
      console.log(`Received message ${msg}`)
      // append to messages list
      this.setState({ messages: [...this.state.messages, { id: msg.id, sender_uid: msg.sender_uid, text: msg.text }] })
    });
  }

  onRouteChanged() {
    alert("CLOSING SOCKET")
    this.state.socket.close()
  }

  // begin searching for a match
  findMatch(match_mode) {
    // TODO: add criteria
    console.log("Finding a match in mode: " + match_mode)
    this.setState({ mode: APP_MODES.SEARCHING, match_mode: match_mode})
    this.state.socket.emit("find-match", match_mode)
  }

  handleMatch(other) {
    // TODO: process data for their UID + profile
    console.log(`Matched with ${other}`)
    this.setState({ mode: APP_MODES.IN_ROOM })
  }

  sendMessage(msg) {
    // TODO: add emoji, other data support
    this.state.socket.emit("message", msg)
  }

  // handles all possible operational messages
  handleSystemMessage(msg) {
    switch (msg) {
      case SYSTEM_MESSAGES.NO_LOGIN:
        // redirect to login page
        window.location.href = process.env.REACT_APP_API_ENDPOINT + "/login";
        return;
      case SYSTEM_MESSAGES.ALREADY_CONNECTED:
        // detect when we are already connected in a different window/browser/device
        console.log('Already connected')
        this.setState({ alreadyConnected: true })
        this.state.socket.close()
        return;
      case SYSTEM_MESSAGES.OTHER_DISCONNECTED:
        console.log("Other has disconnected");
        // trigger disconnection message and timer
        this.setState({ otherDisconnected: true })
        break;
      default:
        console.log("Unrecognized system message: " + msg);
        return;
    }
  }

  getUID = () => {
    return this.state.uid
  }

  AppCard() {
    var mode = this.state.mode
    if (mode == APP_MODES.LANDING) {
      return (
        <AppLanding handleClick={e => this.findMatch(e)} alreadyConnected={this.state.alreadyConnected} />
      );
    } else if (mode == APP_MODES.SEARCHING) {
      return (
        <AppSearching />
      );
    } else if (mode == APP_MODES.IN_ROOM) {
      // https://www.freecodecamp.org/news/building-a-modern-chat-application-with-react-js-558896622194/
      return (
        <AppChatroom messages={this.state.messages} sendMessage={(msg) => this.sendMessage(msg)} getUID={this.getUID} otherDisconnected={() => this.state.otherDisconnected} />
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
        <Prompt
          when={this.state.mode == APP_MODES.IN_ROOM && !this.state.otherDisconnected}
          message="You're currently chatting with someone. Are you sure you want to leave?"
        />
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
