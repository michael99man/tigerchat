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
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardImg,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import TCNavbar from "components/Navbars/TCNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";


// nodejs library that concatenates classes
import classnames from "classnames";

// index page sections
import TCHero from "./IndexSections/TCHero.js";

class Index extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <TCNavbar />
        <main ref="main">
          <div className="position-relative">
            <TCHero />
            <section className="section section-lg" id="how-section">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col className="order-md-2" md="6">
                    {/*<img
                      alt="..."
                      className="img-fluid floating"
                      src={require("assets/img/theme/promo-1.png")}
                    />*/}
                  </Col>
                  <Col className="order-md-1" md="6">
                    <div className="pr-md-5">
                      {/* <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                        <i className="ni ni-settings-gear-65" />
                      </div> */}
                      <h3><div className="sub">HOW IT WORKS</div></h3>
                      <p class ="lead">
                        Tigerchat allows you to meet other Princeton students under the condition of anonymity on a text-based platform. 
                    </p>
                      <ul className="list-unstyled mt-5">
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            {/*<div>
                              <Badge
                                className="badge-circle mr-3"
                                color="success"
                              >
                                <i className="ni ni-settings-gear-65" />
                              </Badge>
                            </div>*/}
                            <div>
                              <p>
                                Match by interest
                            </p>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            {/*<div>
                              <Badge
                                className="badge-circle mr-3"
                                color="success"
                              >
                                <i className="ni ni-html5" />
                              </Badge>
                            </div>*/}
                            <div>
                              <p>Chat with no pressure</p>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="d-flex align-items-center">
                            {/*<div>
                              <Badge
                                className="badge-circle mr-3"
                                color="success"
                              >
                                <i className="ni ni-satisfied" />
                              </Badge>
                            </div>*/}
                            <div>
                              <p>
                                Reveal identity or log out
                            </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="section bg-secondary">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col md="6">
                    {/*<Card className="bg-default shadow border-0">
                      <CardImg
                        alt="..."
                        src={require("assets/img/theme/img-1-1200x1000.jpg")}
                        top
                      />
                      <blockquote className="card-blockquote">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-bg"
                          preserveAspectRatio="none"
                          viewBox="0 0 583 95"
                        >
                          <polygon
                            className="fill-default"
                            points="0,52 583,95 0,95"
                          />
                          <polygon
                            className="fill-default"
                            opacity=".2"
                            points="0,42 583,95 683,0 0,95"
                          />
                        </svg>
                        <h4 className="display-3 font-weight-bold text-white">
                          Design System
                      </h4>
                        <p className="lead text-italic text-white">
                          The Arctic Ocean freezes every winter and much of the
                          sea-ice then thaws every summer, and that process will
                          continue whatever happens.
                      </p>
                      </blockquote>
                    </Card>*/}
                  </Col>
                  <Col md="6">
                    <div className="pl-md-5">
                      {/*<div className="icon icon-lg icon-shape icon-shape-warning shadow rounded-circle mb-5">
                        <i className="ni ni-settings" />
                      </div>*/}
                      <h3 className = "sub">OUR VALUES</h3>
                      <p className="lead">
                        By concentrating on a specific community (Princeton), we're providing
                        a meaningful, secure, and safe place to connect.
                    </p>
                    <p>
                        <em>COMMUNITY.</em> Users are matched by interests, served an icebreaker, 
                        and if both opt-in, reveal their identity
                        (to make a new friend).
                    </p>
                      <p>
                        <em>SECURITY.</em> Chats are wiped once they're done, i.e. conversations
                        aren't stored permanently. 
                    </p>
                    <p>
                        <em>SAFETY.</em> Users engaging in inappropriate behavior can get flagged
                        and kicked; conversations are reviewed using randomly generated id's for 
                        users.
                    </p>
                      {/*<a
                        className="font-weight-bold text-warning mt-5"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        A beautiful UI Kit for impactful websites
                    </a>*/}
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="section pb-0 bg-gradient-secondary">
              <Container>
                <Row className="row-grid align-items-center">
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <div className="position-relative pl-md-5">
                      {/*<img
                        alt="..."
                        className="img-center img-fluid"
                        src={require("assets/img/ill/ill-2.svg")}
                      />*/}
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="6">
                    <div className="d-flex px-3">
                      {/*<div>
                        <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                          <i className="ni ni-building text-primary" />
                        </div>
                      </div>*/}
                      <div className="pl-4">
                        <h3 className = "sub">USER-FRIENDLY CHAT</h3>
                        <p>
                          We're updating anon chat to a more intuitive and
                          cleaner platform. With users first in mind, we're designing
                          to include gifs, stickers, and games for community members.
                      </p>
                      </div>
                    </div>
                    <Card className="shadow shadow-lg--hover mt-5">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-success rounded-circle text-white">
                              <i className="ni ni-satisfied" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-success">
                              SIMPLE DESIGN.
                          </h5>
                            <p>
                              No messy ads on the side. Just chat & meet
                              someone new!
                          </p>
                            {/*<a
                              className="text-success"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Learn more
                          </a>*/}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    <Card className="shadow shadow-lg--hover mt-5">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                              <i className="ni ni-active-40" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-warning">
                              FUN & FLEXIBLE
                          </h5>
                            <p>
                              Bored of chat? Try some of our
                              gifs or emojis!
                          </p>
                            {/*<a
                              className="text-warning"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              Learn more
                          </a>*/}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            <section className="section section-lg" id="why-section">
              <Container>
                <Row className="justify-content-center text-center mb-lg">
                  <Col lg="8">
                    <h2 className="sub">WHY WE'RE HERE</h2>
                    <p>
                      At some point, you plateau in the number of people you meet
                      in college. Tigerchat was created to help you make the most of the
                      incredible network you have at university; it's a non-judgemental
                      platform where you can meet peers and chat about the going-on's in
                      a safe and secure way.
                  </p>
                  <p class = "authors">Created by @glhong and @mman</p>
                  </Col>
                </Row>
                {/*<Row>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("assets/img/theme/team-1-800x800.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Ryan Tompson</span>
                          <small className="h6 text-muted">Web Developer</small>
                        </h5>
                        <div className="mt-3">
                          <Button
                            className="btn-icon-only rounded-circle"
                            color="warning"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-twitter" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="warning"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-facebook" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="warning"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-dribbble" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("assets/img/theme/team-2-800x800.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Romina Hadid</span>
                          <small className="h6 text-muted">
                            Marketing Strategist
                        </small>
                        </h5>
                        <div className="mt-3">
                          <Button
                            className="btn-icon-only rounded-circle"
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-twitter" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-facebook" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="primary"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-dribbble" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("assets/img/theme/team-3-800x800.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">Alexander Smith</span>
                          <small className="h6 text-muted">UI/UX Designer</small>
                        </h5>
                        <div className="mt-3">
                          <Button
                            className="btn-icon-only rounded-circle"
                            color="info"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-twitter" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="info"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-facebook" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="info"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-dribbble" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col className="mb-5 mb-lg-0" lg="3" md="6">
                    <div className="px-4">
                      <img
                        alt="..."
                        className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                        style={{ width: "200px" }}
                      />
                      <div className="pt-4 text-center">
                        <h5 className="title">
                          <span className="d-block mb-1">John Doe</span>
                          <small className="h6 text-muted">Founder and CEO</small>
                        </h5>
                        <div className="mt-3">
                          <Button
                            className="btn-icon-only rounded-circle"
                            color="success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-twitter" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-facebook" />
                          </Button>
                          <Button
                            className="btn-icon-only rounded-circle ml-1"
                            color="success"
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <i className="fa fa-dribbble" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>*/}
              </Container>
            </section>
            <section className="section section-lg pt-0">
              {/*<Container>
                <Card className="bg-gradient-warning shadow-lg border-0">
                  <div className="p-5">
                    <Row className="align-items-center">
                      <Col lg="8">
                        <h3 className="text-white">
                          We made website building easier for you.
                      </h3>
                        <p className="lead text-white mt-3">
                          I will be the leader of a company that ends up being
                          worth billions of dollars, because I got the answers. I
                          understand culture.
                      </p>
                      </Col>
                      <Col className="ml-lg-auto" lg="3">
                        <Button
                          block
                          className="btn-white"
                          color="default"
                          href="https://www.creative-tim.com/product/argon-design-system-react?ref=adsr-landing-page"
                          size="lg"
                        >
                          Download React
                      </Button>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Container>
            </section>
            <section className="section section-lg bg-gradient-default">
              <Container className="pt-lg pb-300">
                <Row className="text-center justify-content-center">
                  <Col lg="10">
                    <h2 className="display-3 text-white">Build something</h2>
                    <p className="lead text-white">
                      According to the National Oceanic and Atmospheric
                      Administration, Ted, Scambos, NSIDClead scentist, puts the
                      potentially record low maximum sea ice extent tihs year down
                      to low ice.
                  </p>
                  </Col>
                </Row>
                <Row className="row-grid mt-5">
                  <Col lg="4">
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-settings text-primary" />
                    </div>
                    <h5 className="text-white mt-3">Building tools</h5>
                    <p className="text-white mt-3">
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                  </p>
                  </Col>
                  <Col lg="4">
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-ruler-pencil text-primary" />
                    </div>
                    <h5 className="text-white mt-3">Grow your market</h5>
                    <p className="text-white mt-3">
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                  </p>
                  </Col>
                  <Col lg="4">
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                      <i className="ni ni-atom text-primary" />
                    </div>
                    <h5 className="text-white mt-3">Launch time</h5>
                    <p className="text-white mt-3">
                      Some quick example text to build on the card title and make
                      up the bulk of the card's content.
                  </p>
                  </Col>
                </Row>
              </Container>*/}
              {/* SVG separator */}
              <div className="separator separator-bottom separator-skew zindex-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="fill-white"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
              </section>
            </div>
        </main>
      </>
    );
  }
}

export default Index;
