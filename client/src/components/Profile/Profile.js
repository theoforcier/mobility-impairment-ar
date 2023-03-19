import { useState, useEffect } from "react";
import Info from './Info';
import Activity from './Activity'
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import './Profile.css'
import { getHTTP } from "../../api/helpers";

function Profile({ ChangePage }) {
  // User information, will be passed to child components
  const [user, setUser] = useState({ bio: "---", email: "---", display_name: "---", first_name: "---", last_name: "---", meters_travelled: "---", points_total: "---", isLoading: true });

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
      <div className="row justify-content-center">
        <div style={{minWidth: '40%', maxWidth: '500px'}}>
          <Card className="text-center pt-3">
            <h1>Profile</h1>
          </Card>
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
