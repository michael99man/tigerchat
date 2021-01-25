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
//import { Link } from "react-router-dom";
import { Link, Scroll } from 'react-scroll'
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  NavLink,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class TCNavbar extends React.Component {
  componentDidMount() {
    let headroom = new Headroom(document.getElementById("navbar-main"));
    // initialise
    headroom.init();
  }

  render() {
    return (
      <>
        <header className="header-global">
          <Navbar
            className="navbar-main navbar-transparent navbar-light headroom"
            expand="lg"
            id="navbar-main"
          >
            <Container>
              <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
                <NavLink 
                activeClassName="active"
                href="http://localhost:3000/">
                <img
                  alt="..."
                  src={require("assets/img/brand/tigerchat.png")
                  }
                />
                </NavLink>
              </NavbarBrand>
              <button className="navbar-toggler" id="navbar_global">
                <span className="navbar-toggler-icon" />
              </button>
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      <Link to="/">
                        <img
                          alt="..."
                          src={require("assets/img/brand/tigerchat.png")}
                        />
                      </Link>
                    </Col>
                    {/*<Col className="collapse-close" xs="6">
                      <button className="navbar-toggler" id="navbar_global">
                        <span />
                        <span />
                      </button>
                    </Col>*/}
                  </Row>
                </div>
                <Nav className="mr-auto">
                  <Link
                    to="how-section"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className='scroll-link'
                    activeClass='scroll-link-active'
                    
                  ><span className="nav-link-inner--text">HOW</span></Link>
                  <Link
                    to="why-section"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className='scroll-link ml-4'
                    activeClass='scroll-link-active'
                > <span className="nav-link-inner--text">WHY</span></Link>
                
                <Link
                    to="faq-section"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className='scroll-link ml-4'
                    activeClass='scroll-link-active'
                  > <span className="nav-link-inner--text">FAQ</span></Link>
                </Nav>
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                 { /* 
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.facebook.com/creativetim"
                      id="tooltip333589074"
                      target="_blank"
                    >
                      <i className="fa fa-facebook-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Facebook
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip333589074">
                      Like us on Facebook
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://www.instagram.com/creativetimofficial"
                      id="tooltip356693867"
                      target="_blank"
                    >
                      <i className="fa fa-instagram" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Instagram
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip356693867">
                      Follow us on Instagram
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://twitter.com/creativetim"
                      id="tooltip184698705"
                      target="_blank"
                    >
                      <i className="fa fa-twitter-square" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Twitter
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip184698705">
                      Follow us on Twitter
                    </UncontrolledTooltip>
                  </NavItem>
                  */}
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      href="https://github.com/michael99man/tigerchat"
                      id="tooltip112445449"
                      target="_blank"
                    >
                      <i className="fa fa-github" />
                      <span className="nav-link-inner--text d-lg-none ml-2">
                        Github
                      </span>
                    </NavLink>
                    <UncontrolledTooltip delay={0} target="tooltip112445449">
                      Read our code on Github
                    </UncontrolledTooltip>
                  </NavItem>
                  <NavItem className="d-none d-lg-block ml-lg-4">
                    <Button
                      className="btn-orange btn-icon"
                      color="default"
                      href={process.env.REACT_APP_API_ENDPOINT + "/login"}
                      target="_blank"
                    >
                      <span className="btn-inner--icon">
                        <i className="ni ni-chat-round mr-2" />
                    </span>
                    
                      <span className="btn-inner--text ml-1">
                        Open App
                      </span>
                    </Button>
                  </NavItem>
                </Nav>
            </Container>
          </Navbar>
        </header>
      </>
    );
  }
}

export default TCNavbar;
