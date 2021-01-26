import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Row,
} from "reactstrap";

import { Dot } from 'react-animated-dots';
import { MATCH_MODE } from 'views/Constants.js';

class AppSearching extends React.Component {

  GetSearchText = () => {
    var dots = (<>
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </>)

    var match_mode = this.props.matchMode();
    var profile = this.props.getProfile()
    if (profile === null && match_mode !== MATCH_MODE.ANYONE) {
      console.log("Invalid profile.")
      return
    }

    switch (match_mode) {
      case (MATCH_MODE.ANYONE):
        return <><p>Searching for any Tiger</p>{dots}</>;
      case (MATCH_MODE.CLASS):
        return <><p>{`Searching for someone in the same class (${profile.class_year})`}</p>{dots}</>;
      case (MATCH_MODE.MAJOR):
        return <><p>{`Searching for someone in the same major (${profile.major_code})`}</p>{dots}</>;
      case (MATCH_MODE.RES_COLLEGE):
        return <><p>{`Searching for someone in the same residential college (${profile.res_college})`}</p>{dots}</>;
      default:
        return <><p>Invalid match mode</p></>
    }
  }

  // link to default back to match anyone mode
  MatchAnyoneMsg = () => {
    var match_mode = this.props.matchMode();
    if (match_mode === MATCH_MODE.ANYONE) {
      return (null)
    }
    return (
      <>
        <Row className="row-grid justify-content-center">
          <p onClick={() => this.props.matchAnyone()}>Match with anyone instead</p>
        </Row>
      </>
    );
  }

 // rching matchMode={() => this.state.match_mode} matchAnyone={() => this.setState({match_mode: MATCH_MODE.ANYONE})}/>

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
              <this.GetSearchText/>
            </Row>
            <this.MatchAnyoneMsg/>
            <Row className="row-grid justify-content-center">
              <Button
                className="mt-4"
                color="orange"
                onClick={e => {
                  e.preventDefault();
                  this.props.cancelSearch();
                }}>
                Cancel search
              </Button>
            </Row>
          </CardBody>
        </Card>
      </>);
  }
}

export default AppSearching;
