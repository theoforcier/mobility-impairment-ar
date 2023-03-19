import React, { useState, useEffect } from "react";
import { getHTTP } from "../../api/helpers";
import {getFormattedDateUTC } from "../../scripts/date";
import './MainUIInfo.css'

const MainUIInfo = () => {

  const [todaysInfo, setTodaysInfo] = useState({ distance: '---', points: '---' });

  useEffect(() => {
    const getTodaysInfo = () => {

      const dateNow = getFormattedDateUTC();

      const promises = [
        getHTTP("distance", { date: dateNow }),
        getHTTP("user/points", { from_date: dateNow })
      ]

      Promise.all(promises).then(responses => {

        let distance = '---'
        let points = '---'

        if (responses[0].success)
          distance = responses[0].data.meters
        if (responses[1].success)
          points = responses[1].data.points

        setTodaysInfo({distance, points})

      })

    }

    getTodaysInfo();

    // Set up the interval
    const intervalId = setInterval(() => {
      getTodaysInfo();
    }, 15 * 1000);

    // Clean up the interval on unmount
    return () => {
      clearInterval(intervalId);
    };
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