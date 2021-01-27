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
import SharedSection from "components/Navbars/Section.js";
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


            <SharedSection />

          </div>
        </main>
        <title>Bob</title>
      </>
      
    );
  }
}

export default Index;
