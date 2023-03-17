import { useEffect } from "react";
import { postHTTP } from "./api/helpers";

import { getHTTP } from "./api/helpers";
function DistanceTracker() {
  useEffect(() => {
    // calculate distance between two points on a spherical plane
    function calcCrow(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        //console.log(d);

      return d;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // update our locally stored distance

    function calculateDistance() {
      let prevLat, prevLon;
      let totalDistance = 0;
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (prevLat && prevLon) {
              const distance = calcCrow(prevLat, prevLon, latitude, longitude) * 1000; // convert to meters
              totalDistance += distance;
              //console.log(totalDistance);
              localStorage.setItem("metersTravelled", totalDistance);
            }
            prevLat = latitude;
            prevLon = longitude;
          },
          (error) => console.error(error),
          { enableHighAccuracy: true }
        );
      }, 5000);
       // update every 5 seconds
    } 

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(calculateDistance);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // update the distance at the API
    function updateDistance() {
      const distance = parseInt(localStorage.getItem("metersTravelled"));
      
      //const distance = 100;
      //console.log(distance);
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const payload = { meters: distance, date: formattedDate };
      const payload1 = { date: formattedDate };
      postHTTP("distance/add", payload).then((response) => {
        console.log(response)
        if (response.success) {
          // update the distance
          let recentDistance = localStorage.getItem("metersTravelled");
          recentDistance = recentDistance ? parseInt(recentDistance) : 0; // 0 if not exists
          let newDistance = Math.max(0, recentDistance - distance);
          localStorage.setItem("metersTravelled", newDistance);
          console.log(newDistance);
        }
      });
      getHTTP("distance", payload1 ).then((response) => {
        console.log(response)
      });
    }

    // make API call every 30 seconds
    setInterval(updateDistance, 30 * 1000);
  }, []); // run only once on mount

  return null;
}

export default DistanceTracker;