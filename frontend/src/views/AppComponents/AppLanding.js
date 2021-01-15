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


class AppLanding extends React.Component {
  click = (e) => {
    this.props.handleClick(e);
  }

  render() {
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
                onClick={e => this.click(e)}
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
