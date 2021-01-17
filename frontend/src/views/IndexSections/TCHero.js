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
import { Button, Container, Row, Col } from "reactstrap";

class TCHero extends React.Component {
  render() {
    return (
      <>
        <div className="position-relative fullscreen">
          {/* Hero for FREE version */}
          <section className="section section-hero section-shaped">
            {/* Background circles */}
            <div className="shape shape-style-1 shape-default">
              <span className="span-150" />
              <span className="span-50" />
              <span className="span-50" />
              <span className="span-75" />
              <span className="span-100" />
              <span className="span-75" />
              <span className="span-50" />
              <span className="span-100" />
              <span className="span-50" />
              <span className="span-100" />
            </div>
            <Container className="shape-container d-flex align-items-center py-lg">
              <div className="col px-0">
                <Row className="align-items-center justify-content-center">
                  <Col className="text-center" lg="6">
                    <img
                      alt="..."
                      className="img-fluid"
                      src={require("assets/img/brand/tigerchat.png")}
                      style={{ width: "350px" }}
                    />
                    <p className="lead text-white typewriter">
                      A new way to anonymously connect 
                    </p>
                    <div className="btn-wrapper mt-5">
                      <Button
                        className="btn-orange btn-icon mb-3 mb-sm-0"
                        color="default"
                        href={process.env.REACT_APP_API_ENDPOINT + "/login"}
                        size="lg"
                      >
                        <span className="btn-inner--text">Chat Now!</span>
                      </Button>{" "}
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
            
          </section>
        </div>
      </>
    );
  }
}

export default TCHero;
