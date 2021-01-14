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
  state = { mode: MODES.LANDING, socket:null };
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    this.initSocket()
  }

  initSocket() {
    const socket = socketIOClient(ENDPOINT, {withCredentials:true});

    socket.on("match", data => {
      this.handleMatch(data);
    });

    // detect incoming "chat message" event and write to page
    socket.on('message', msg => {
      this.handleMessage(msg)
    });

    this.setState({socket: socket})
  }

  // begin searching for a match
  findMatch(e) {
    e.preventDefault();
    this.setState({ mode: MODES.SEARCHING })
    
    this.state.socket.emit("find-match")
  }

  handleMatch(data) {
    console.log(data)
    this.setState({mode: MODES.IN_ROOM})
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
          <div className="position-relative fullscreen">
            {/* shape Hero */}
            <section className="section section-lg section-shaped" style={{ height: '100%' }}>
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
