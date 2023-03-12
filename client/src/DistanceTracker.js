import { useEffect } from "react";
import { postHTTP } from "./api/helpers";

function DistanceTracker() {
  useEffect(() => {
    // Degrees to radians
    function toRad(degrees) {
      return (degrees * Math.PI) / 180;
    }

    // calculate distance between two points on a spherical plane
    function calcCrow(lat1, lon1, lat2, lon2) {
      let R = 6378.137;
      let dLat = toRad(lat2 - lat1);
      let dLon = toRad(lon2 - lon1);
      let lat1Rad = toRad(lat1);
      let lat2Rad = toRad(lat2);

      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1Rad) *
          Math.cos(lat2Rad);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return d;
    }

    // update our locally stored distance
    let lastPosition;

    function calculateDistance(position) {
      let lat2 = position.coords.latitude;
      let lon2 = position.coords.longitude;

      if (lastPosition) {
        let lat1 = lastPosition.coords.latitude;
        let lon1 = lastPosition.coords.longitude;
        let distance = calcCrow(lat1, lon1, lat2, lon2).toFixed(1);

        // update distance
        let currentDistance = localStorage.getItem("metersTravelled");
        currentDistance = currentDistance ? parseInt(currentDistance) : 0; // 0 if not exists

        let newDistance = currentDistance + parseFloat(distance);
        localStorage.setItem("metersTravelled", newDistance);
      }

      lastPosition = position;

      // update distance travelled every 5 seconds (5 * 1000 milliseconds)
      setTimeout(function () {
        navigator.geolocation.getCurrentPosition(showPosition);
      }, 5 * 1000);
    }

    // Make the first distance computation
    function showPosition(position) {
      calculateDistance(position);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    // update the distance at the API
    function updateDistance() {
      const distance = localStorage.getItem("metersTravelled");
      const payload = { distance: distance };
      postHTTP("user/distance/add", payload).then((response) => {
        if (response.success) {
          // update the distance
          const recentDistance = localStorage.getItem("metersTravelled");
          let newDistance = Math.max(0, recentDistance - distance);
          localStorage.setItem("metersTravelled", newDistance);
        }
      });
    }

    // make API call every 30 seconds
    setInterval(updateDistance, 30 * 1000);
  }, []); // run only once on mount

  return null;
}

export default DistanceTracker;
