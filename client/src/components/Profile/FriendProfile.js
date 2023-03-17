import Activity from './Activity'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUser } from "@fortawesome/free-solid-svg-icons";

import './Profile.css'

function FriendProfile({ ChangePage, page }) {
  return (
    <div className="Profile">
        <div className="info">
          <br />
          <h1>{page.modifier.display_name}</h1>
          <FontAwesomeIcon className="profile-icon" icon={faUser} size="5x" />
          <br />
          <br />
          {page.modifier.bio ? (
            <p className="quote">{page.modifier.bio}</p>
          ) : (
            <></>
          )}
        </div>
        <Activity user={page.modifier} />
        <br></br>

        <div className="fixed-bottom d-flex justify-content-end m-4">
          <Button
            className="rounded-circle"
            onClick={() => ChangePage("main", "")}
          >
            <FontAwesomeIcon icon={faXmark} />{" "}
          </Button>
        </div>

    </div>
  );
}

export default FriendProfile;