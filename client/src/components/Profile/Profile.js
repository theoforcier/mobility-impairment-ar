import { useState, useEffect } from "react";
import Info from './Info';
import Activity from './Activity'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import './Profile.css'
import { getHTTP } from "../../api/helpers";

function Profile({ ChangePage }) {
  const [user, setUser] = useState({ bio: "", email: "", display_name: "", first_name: "", last_name: "", meter_traveled: "", point_total: "" });

  useEffect(() => {
    getHTTP("user").then((response) => {
      if (response.success) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <div className="Profile">
        <Info user={user} setUser={setUser} />
        <Activity user={user} />
        <br></br>
        
        <div className="d-flex justify-content-left">
          <Button className="rounded-circle" onClick={() => ChangePage("main", "")}> <FontAwesomeIcon icon={faXmark}/> </Button>
        </div>
        
        <br></br>
        <br></br>
        <br></br>
    </div>
  );
}

export default Profile;
