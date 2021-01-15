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
  Col,
  Alert,
} from "reactstrap";


class AppLanding extends React.Component {
  click = (e) => {
    this.props.handleClick(e);
  }

  render() {
    console.log(this.props);
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
