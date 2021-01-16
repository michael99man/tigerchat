import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Row,
} from "reactstrap";

import { Dot } from 'react-animated-dots';

class AppSearching extends React.Component {

  // get info from parent 
  
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
                className="mt-4 disabled"
                color="orange"
                onClick={e => e.preventDefault()}
              >
                SEARCHING
                <Dot>.</Dot>
                <Dot>.</Dot>
                <Dot>.</Dot>
              </Button>
            </Row>
          </CardBody>
        </Card>
      </>);
  }
}

export default AppSearching;
