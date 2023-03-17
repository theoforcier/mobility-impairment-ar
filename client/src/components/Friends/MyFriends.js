import React from 'react'
import { useEffect } from "react";
import { Card, ListGroup, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { getHTTP } from "../../api/helpers";

export default function MyFriends({ friends, setFriends, ChangePage }) {
  // Fetch and store user friends
  useEffect(() => {
    getHTTP("friends").then((response) => {
      if (response.success){
        setFriends(response.data.users);
      }
    });
  }, []);

  return (
    <div className="myFriends my-4">
      <Card className="myFriendsCard">
        <Card.Header>My Friends</Card.Header>
        <Card.Body className="overflow-auto"> 
          {friends.length ? 
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

          : <div className="text-center">Add a friend with the search box above!</div>
          }
        </Card.Body>
      </Card>
    </div>
  )
}
