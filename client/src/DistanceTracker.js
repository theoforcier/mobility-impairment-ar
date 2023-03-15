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
        console.log(d);

      return d;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // update our locally stored distance
    let lastPosition;

    function calculateDistance(position) {
      let lat2 = position.coords.latitude;
      let lon2 = position.coords.longitude;

      if (lastPosition) {
        let lat1 = lastPosition.coords.latitude;
        let lon1 = lastPosition.coords.longitude;
        //let distance = calcCrow(lat1, lon1, lat2, lon2);

        let distance = calcCrow(52.5200,13.4050,51.5074, -0.1278);

        // update distance
        let currentDistance = localStorage.getItem("metersTravelled");
        currentDistance = currentDistance ? parseInt(currentDistance) : 0; // 0 if not exists

        let newDistance = currentDistance + distance;
        localStorage.setItem("metersTravelled", newDistance);
      }

      lastPosition = position;

      // update distance travelled every 5 seconds (5 * 1000 milliseconds)
      setTimeout(function () {
        navigator.geolocation.getCurrentPosition(calculateDistance);
      }, 5 * 1000);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(calculateDistance);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // update the distance at the API
    function updateDistance() {
      const distance = localStorage.getItem("metersTravelled");
      
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
        if (response.success) {
          // update the distance
          let recentDistance = localStorage.getItem("metersTravelled");
          recentDistance = recentDistance ? parseInt(recentDistance) : 0; // 0 if not exists
          let newDistance = Math.max(0, recentDistance - distance);
          localStorage.setItem("metersTravelled", newDistance);
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