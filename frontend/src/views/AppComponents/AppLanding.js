// import { Dropdown } from "bootstrap";
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  UncontrolledDropdown,
  Row,
  Col,
  Alert,
} from "reactstrap";
import ButtonDropdown from "reactstrap/lib/ButtonDropdown";

import {MATCH_MODE, MATCH_MODE_TEXT} from "views/Constants.js"

class AppLanding extends React.Component {
  state = {
    mode: MATCH_MODE.ANYONE,
    dropDownOpen: false,
  }

  // propagates the button click to the parent 
  // TODO: PASS MODE!
  click = (e) => {
    e.preventDefault();
    this.props.handleClick(this.state.mode);
  }

  toggle = () => {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen,
    })
  }

  // handle change of selector
  handleChange = (mode) => {
    this.setState({
      mode: mode
    })
  }

  render() {
    return (
      <>
        <Card className="shadow border-0 app-card">
          {
            // if already connected, print an error message
            this.props.alreadyConnected
            &&
            <Alert color="danger">
              <strong>Connection error!</strong> You're already connected to TigerChat on another device.
        </Alert>
          }
          <CardBody className="py-xl align-items-center">

            <Row className="row-grid justify-content-center align-items-center">
              <h6 className="text-orange text-uppercase">
                Chat with a random Tiger!
        </h6>
            </Row>

            <Row className="centered py-4">
              {/* TODO: SET ME TO FIXED WIDTH */}
              <ButtonDropdown>
                <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggle}>
                  <DropdownToggle caret color="secondary">
                    {`Match mode: ${MATCH_MODE_TEXT[this.state.mode][1]}`}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.handleChange(MATCH_MODE.ANYONE)}>
                      {MATCH_MODE_TEXT[MATCH_MODE.ANYONE][0]}
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleChange(MATCH_MODE.CLASS)}>
                      {MATCH_MODE_TEXT[MATCH_MODE.CLASS][0]}
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleChange(MATCH_MODE.MAJOR)}>
                      {MATCH_MODE_TEXT[MATCH_MODE.MAJOR][0]}
                    </DropdownItem>
                    <DropdownItem onClick={() => this.handleChange(MATCH_MODE.RES_COLLEGE)}>
                      {MATCH_MODE_TEXT[MATCH_MODE.RES_COLLEGE][0]}
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </ButtonDropdown>

            </Row>
            <Row className="row-grid justify-content-center">
              <Button
                className="mt-4"
                color="orange"
                onClick={e => this.click(e)}
                disabled={this.props.alreadyConnected}
              >
                Find match
        </Button>
            </Row>
          </CardBody>
        </Card>
      </>
    );
  }
}

export default AppLanding;
