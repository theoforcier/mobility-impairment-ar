import React, {useState, useEffect} from "react";
import { Container, Row } from 'react-bootstrap';
import './MainUIInfo.css'
import { getHTTP } from "../../api/helpers"
import { getFormattedDate } from "../../scripts/date";

const MainUIInfo = () => {
  const [todaysInfo, setTodaysInfo] = useState({ distance: "", points: "" });

  useEffect(() => {
    const getTodaysInfo = () => {
      let payload = {
        date: getFormattedDate()
      };
  
      getHTTP("distance", payload).then((response) => {
        if (response.success){
          setTodaysInfo({ distance: response.data.meters });
        }
      });
      /*getHTTP("user/points", payload).then((response) => {
        if (response.succes) {
          setTodaysInfo({ points: response.data.points })
        }
      })*/
    }
    getTodaysInfo();
    const interval = setInterval(() => {
      getTodaysInfo();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="d-flex justify-content-between">
      <Row className="d-flex justify-content-between">
        <div className="col-6">
          <div className="box" style={{ borderRadius: "20px", paddingTop: "20px", margin: "10px" }}>
            <p style={{ color: "#5a7bd0", textAlign: "center"}} ><br/><b>Distance Travelled</b> <br /><h1 style={{ color: "#5a7bd0", textAlign: "center", textShadow: "1px 1px 1px #000", fontSize: "30px"}}>{todaysInfo.distance}</h1></p>
          </div>
        </div>
        <div className="col-6">
          <div className="box" style={{ borderRadius: "20px", paddingTop: "20px", margin: "10px"}}>
            <p style={{ color: "#5a7bd0", textAlign: "center"}}><br/><b>Points Earned</b> <br /><h1 style={{ color: "#5a7bd0", textAlign: "center",textShadow: "1px 1px 1px #000", fontSize: "30px"}}>80</h1></p>
          
          </div>
        </div>
      </Row>
    </Container>
  );
}
export default MainUIInfo