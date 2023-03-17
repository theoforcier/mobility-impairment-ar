import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './MainUIInfo.css'

const MainUIInfo = () => {
    return (
      <div className="d-flex justify-content-center">

        <div className="box me-2" style={{ borderRadius: "20px"}}>
          <div style={{ color: "#5a7bd0", textAlign: "center"}} ><br/>
            <b>Distance Travelled</b>
            <h1 style={{ color: "#5a7bd0", textAlign: "center", textShadow: "1px 1px 1px #000", fontSize: "33px"}}>1542M</h1>
          </div>
        </div>

        <div className="box ms-2" style={{ borderRadius: "20px"}}>
          <div style={{ color: "#5a7bd0", textAlign: "center"}}><br/>
            <b>Points Earned</b>
            <h1 style={{ color: "#5a7bd0", textAlign: "center",textShadow: "1px 1px 1px #000", fontSize: "33px"}}>80</h1>
          </div>
        
        </div>

      </div>
      );
}
export default MainUIInfo