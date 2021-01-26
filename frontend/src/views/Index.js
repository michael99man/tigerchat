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
  Card,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import TCNavbar from "components/Navbars/TCNavbar.js";

// nodejs library that concatenates classes
// import classnames from "classnames";

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
                      <p class="lead">
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

            <section className="section section-lg pb-4 bg-gradient-secondary" id="why-section">
              <Container>
                <Row className="justify-content-center text-center mb-lg">
                  <Col lg="8">
                    <h2 className="sub">WHY WE'RE HERE</h2>
                    <p>
                      Whether you're new to campus or a senior about to graduate,
                      Tigerchat encourages everyone to forge new connections with other members of the
                      Princeton community. We created Tigerchat to help you make the most of the
                      incredible network you have at university; it's a non-judgemental
                      platform where you can meet peers, make new friends, and chat about the going-on's in
                      a safe and secure way.
                  </p>
                    <p class="authors">Created by ...</p>
                  </Col>
                </Row>
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
              </Container>

            </section>

            <section className="section bg-secondary" id="values-section">
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
                      <h3 className="sub">OUR VALUES</h3>
                      <p className="lead">
                        Only open to members of the Princeton community, Tigerchat provides stduents with
                        a meaningful, private, and secure place to connect.
                    </p>
                      <p>
                        <em>COMMUNITY.</em> Users are matched by interests, served an icebreaker question,
                        and if both opt-in, reveal their identity (and make a new friend).
                    </p>
                      <p>
                        <em>PRIVACY.</em> Chats are wiped once they're done, i.e. conversations
                        aren't stored permanently. Identities remain completely anonymous unless revealed.
                    </p>
                      <p>
                        <em>SAFETY.</em> We want Tigerchat to be a platform where everyone
                        feels safe and included. Users engaging in inappropriate behavior are flagged
                        and removed from the platform.
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

            <section className="section pb-xl bg-gradient-secondary" id="faq-section">
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
                        <h3 className="sub">FREQUENTLY ASKED QUESTIONS</h3>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="row-grid align-items-center">
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <Card className="shadow shadow-lg--hover">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-orange rounded-circle text-white">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-orange">
                              Am I 100% anonymous?
                          </h5>
                            <p className = "faq">
                              Yes! Everyone who uses our platform remains completely anonymous
                              to the development team and their fellow users. If you decide to reveal your identity, then
                              your identity will be known only to the user(s) you're chatting with. 
                          </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <Card className="shadow shadow-lg--hover">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-orange rounded-circle text-white">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-orange">
                              Is there any data collected on users?
                          </h5>
                            <p className = "faq">
                              Again, your identity remains completely anonymous to us.
                              We wipe conversations, unless a user reports a user, in 
                              which case we will analyze the conversation to determine
                              whether it is a violation of community rules. 
                          </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className="row-grid align-items-center">
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <Card className="shadow shadow-lg--hover">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-orange rounded-circle text-white">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-orange">
                              How do I get matched to someone?
                          </h5>
                            <p className = "faq">
                              There are three ways to match: 1) match randomly, 
                              2) match by class year, 3) match by major, or 
                              4) match by residential college. If we cannot
                              find a match based on the  students who are using
                              the platform live from 2, 3, or 4, we will ask if you 
                              are willing to match randomly.
                          </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <Card className="shadow shadow-lg--hover">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-orange rounded-circle text-white">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-orange">
                              What if there's no one to match with?
                          </h5>
                            <p className = "faq">
                              Since we're using a still relatively small population,
                              at times when we have few live users, it might be
                              difficult for us to find you a match. However, we are 
                              planning on lauching group chat features to facilitate 
                              chats at these times.
                          </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className="row-grid align-items-center">
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <Card className="shadow shadow-lg--hover">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-orange rounded-circle text-white">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-orange">
                              How do I know if the people I'm chatting with are only Princeton students?
                          </h5>
                            <p className = "faq">
                              We use CAS authentication. Therefore, it is impossible for users to 
                              use the platform without being a current Princeton student. We plan 
                              on launching the platform later to other schools, so there may be a 
                              chance that you're able to match with students outside of your college :)
                          </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="order-lg-2 ml-lg-auto" md="6">
                    <Card className="shadow shadow-lg--hover">
                      <CardBody>
                        <div className="d-flex px-3">
                          <div>
                            <div className="icon icon-shape bg-gradient-orange rounded-circle text-white">
                              <i className="fa fa-question" />
                            </div>
                          </div>
                          <div className="pl-4">
                            <h5 className="title text-orange">
                              What happens in the reporting process?
                          </h5>
                            <p className = "faq">
                              If a user is violating our community guidelines, the other
                              user can use the "Report" button to report a violation. 
                              We will then investigate the conversation and determine
                              if it is a true violation. If so, the violator
                                will receive a warning on first offense; afterwards, we
                              reserve the right to remove them from the platform.
                          </p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
              {/* SVG separator 
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
              */}
            </section>
          </div>
        </main>
      </>
    );
  }
}

export default Index;
