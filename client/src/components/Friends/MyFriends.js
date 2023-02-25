import React from 'react'
import { useState, useEffect } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { getHTTP } from "../../api/helpers";

export default function MyFriends({ friends, setFriends, ChangePage }) {

  useEffect(() => {
    getHTTP("friends").then((response) => {
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
              <ListGroup.Item className="d-flex justify-content-between align-items-center" key={friend.id}>
                <span>
                  {friend.display_name}
                </span>
                <div>
                  <Button className="card-button" onClick={() => ChangePage("friend_profile", friend)}> <FontAwesomeIcon icon={faUser} /></Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>



      <hr style={{ border: "1px solid black" }} />
    </div>
  )
}
