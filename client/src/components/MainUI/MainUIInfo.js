import React, { useState, useEffect } from "react";
import { getHTTP } from "../../api/helpers";

import './MainUIInfo.css'

const MainUIInfo = () => {

    const [points, setPoints] = useState(0);

    useEffect(() => {

      // Fetch points
      const payload = { from_date: "2023-03-17" }           // insert today's date in YYYY-MM-DD (in UTC time zone)
      getHTTP("user/points", payload).then(response => {
        if (response.success)
          setPoints(response.data.points)
      })
    }, [])

    return (
      <div className="d-flex justify-content-center">

        <div className="box me-2" style={{ borderRadius: "20px"}}>
          <div style={{ color: "#5a7bd0", textAlign: "center"}} ><br/>
            <b>Distance Travelled</b>
            <h1 style={{ color: "#5a7bd0", textAlign: "center", textShadow: "1px 1px 1px #000", fontSize: "33px"}}>
              1234
            </h1>
          </div>
        </div>

        <div className="box ms-2" style={{ borderRadius: "20px"}}>
          <div style={{ color: "#5a7bd0", textAlign: "center"}}><br/>
            <b>Points Earned</b>
            <h1 style={{ color: "#5a7bd0", textAlign: "center",textShadow: "1px 1px 1px #000", fontSize: "33px"}}>
              {points}
            </h1>
          </div>
        
        </div>

      </div>
      );
}
export default MainUIInfo