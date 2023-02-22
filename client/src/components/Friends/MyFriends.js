import React from 'react'
import { useState, useEffect } from "react";
import { Card, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { getHTTP } from "../../api/helpers";

export default function MyFriends() {
  const [friends, setFriends] = useState( [] );

  useEffect(() => {
    getHTTP("friends").then((response) => {
      console.log(response);
      setFriends(response.data.users);
    });
  }, []);

  return (
    <div className="myFriends">
      <h1>My Friends</h1>

      <Card className="myFriendsCard">
        <Card.Body className="overflow-auto"> 
          <ListGroup variant="flush">
            {friends.map((friend) => (
              <ListGroup.Item key={friend.display_name}>{friend.display_name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>



      <hr style={{ border: "1px solid black" }} />
    </div>
  )
}
