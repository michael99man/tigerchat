
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

class AppNavbar extends React.Component {
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
            <NavbarBrand className="mr-lg-5">
                <NavLink 
                activeClassName="active"
                href="/">
                <img
                  alt="..."
                  src={require("assets/img/brand/tigerchat.png")
                  }
                />
                </NavLink>
              </NavbarBrand>
                
                <Nav className="align-items-lg-center ml-lg-auto" navbar>
                
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

export default AppNavbar;
