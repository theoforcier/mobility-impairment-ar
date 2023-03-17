import { useState } from 'react';

import AddFriend from './AddFriend';
import MyFriends from './MyFriends';
import FriendRequest from './FriendRequest';
import { Button, Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import './Friends.css';

function Friends({ ChangePage }) {
  // User's current friend, read/written to by children components
  const [friends, setFriends] = useState( [] );

  return (
    <div className="Friend p-3">
      <div className="row justify-content-center">
        <div style={{minWidth: '40%', maxWidth: '500px'}}>

          <Card className="text-center pt-3 mb-3">
            <h1>Friends</h1>
          </Card>

          <div className="mt-5 mb-4">
            <AddFriend />
          </div>

          <hr style={{ border: "1px solid black" }} />

          <div className="my-4">
            <MyFriends friends={friends} setFriends={setFriends} ChangePage={ChangePage} />
          </div>

          <hr style={{ border: "1px solid black" }} />

          <div className="mt-4">
            <FriendRequest friends={friends} setFriends={setFriends} />
          </div>
        </div>
      </div>
      
      <div className="fixed-bottom d-flex justify-content-end m-4">
        <Button
          className="rounded-circle"
          onClick={() => ChangePage("main", "")}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />{" "}
        </Button>
      </div>
    </div>
  );
}

export default Friends;
