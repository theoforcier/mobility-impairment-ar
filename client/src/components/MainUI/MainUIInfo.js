import React, { useState, useEffect } from "react";
import { getHTTP } from "../../api/helpers";
import {getFormattedDateUTC } from "../../scripts/date";
import './MainUIInfo.css'

const MainUIInfo = () => {

  const [todaysInfo, setTodaysInfo] = useState({ distance: 0, points: 0 });

  useEffect(() => {
    const getTodaysInfo = () => {
      const payload = {
        date: getFormattedDateUTC()
      };

      const payloadUTC = {
        date: getFormattedDateUTC()
      }
  
      getHTTP("distance", payload).then((response) => {
        if (response.success){
          setTodaysInfo(currentTodaysInfo => {
            return { ...currentTodaysInfo, distance: response.data.meters }
          })
        }
      });

      getHTTP("user/points", payloadUTC).then(response => {
        if (response.success)
          setTodaysInfo(currentTodaysInfo => {
            return { ...currentTodaysInfo, points: response.data.points }
          })
      });

    }
    getTodaysInfo();
    const interval = setInterval(() => {
      getTodaysInfo();
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="d-flex justify-content-center">

      <div className="box me-2" style={{ borderRadius: "20px"}}>
        <div style={{ color: "#5a7bd0", textAlign: "center"}} ><br/>
          <b>Distance Travelled</b>
          <h1 style={{ color: "#5a7bd0", textAlign: "center", textShadow: "1px 1px 1px #000", fontSize: "33px"}}>
            {todaysInfo.distance}
          </h1>
        </div>
      </div>

      <div className="box ms-2" style={{ borderRadius: "20px"}}>
        <div style={{ color: "#5a7bd0", textAlign: "center"}}><br/>
          <b>Points Earned</b>
          <h1 style={{ color: "#5a7bd0", textAlign: "center",textShadow: "1px 1px 1px #000", fontSize: "33px"}}>
            {todaysInfo.points}
          </h1>
        </div>
      
      </div>

    </div>
  );
}
export default MainUIInfo