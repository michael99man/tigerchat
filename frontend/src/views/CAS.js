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
  Form,
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

class CAS extends React.Component {
  state = { netid: Math.random().toString(36).substring(7), password: "password1" }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state)
  }

  // process changes to our form 
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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
                <Card className="shadow border-0 app-card">
                  <CardBody className="py-xl align-items-center">

                    <Row className="row-grid justify-content-center align-items-center">
                      <h6 className="text-orange text-uppercase">
                        FAKE CAS IMPLEMENTATION
          </h6>
                    </Row>
                    <Row
                      className="row-grid justify-content-center"

                    >
                      <Form method="get"
                        action={process.env.REACT_APP_API_ENDPOINT + "/login"}>

                        <FormGroup>
                          <Input ref=""
                            id="cas-netid"
                            placeholder="netid"
                            type="text"
                            name="netid"
                            onChange={e => this.handleInputChange(e)}
                          />
                          <Input
                            id="cas-password"
                            name="password"
                            placeholder="password1"
                            type="text"
                            onChange={e => this.handleInputChange(e)}
                          />
                        </FormGroup>

                        {/* SUBMIT FAKE LOGIN */}
                        <Input className="mt-4"
                          color="orange"
                          value="submit"
                          type="submit"
                        />
                      </Form>
                    </Row>
                  </CardBody>
                </Card>
              </Container>
            </section>
            {/* 1st Hero Variation */}
          </div>
        </main>
      </>
    );
  }
}


export default CAS;
