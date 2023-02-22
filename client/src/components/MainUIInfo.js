import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './MainUIInfo.css'

const MainUIInfo = () => {
    return (
        <Container className="d-flex justify-content-between">
          <Row>
            <div className="col-6">
              <div className="box" style={{ borderRadius: "20px" }}>
                <p style={{ color: "#5a7bd0", textAlign: "center"}} ><br/><b>Distance Travelled</b> <br /><h1 style={{ color: "#5a7bd0", textAlign: "center", textShadow: "1px 1px 1px #000", fontSize: "30px"}}>1542M</h1></p>
              </div>
            </div>
            <div className="col-6">
              <div className="box" style={{ borderRadius: "20px" }}>
                <p style={{ color: "#5a7bd0", textAlign: "center"}}><br/><b>Points Earned</b> <br /><h1 style={{ color: "#5a7bd0", textAlign: "center",textShadow: "1px 1px 1px #000", fontSize: "30px"}}>80</h1></p>
              
              </div>
            </div>
          </Row>
        </Container>
      );
}
export default MainUIInfo