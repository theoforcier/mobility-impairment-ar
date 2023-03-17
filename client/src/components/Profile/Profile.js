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
  // User information, will be passed to child components
  const [user, setUser] = useState({ bio: "", email: "", display_name: "", first_name: "", last_name: "", meter_traveled: "", point_total: "" });

  // Fetch and store user information
  useEffect(() => {
    getHTTP("user").then((response) => {
      if (response.success) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <div className="Profile p-3">
      <div class="row justify-content-center">
        <div style={{minWidth: '40%', maxWidth: '500px'}}>
          <Info user={user} setUser={setUser} />
          <Activity user={user} />
          <br></br>
          
          <div className="fixed-bottom d-flex justify-content-end m-4">
            <Button
              className="rounded-circle"
              onClick={() => ChangePage("main", "")}
            >
              <FontAwesomeIcon icon={faXmark} size="xl" />{" "}
            </Button>
          </div>
        </div>
      </div>
        
    </div>
  );
}

export default Profile;
