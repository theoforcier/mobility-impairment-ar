import { useState, useEffect } from "react";
import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { getHTTP, putHTTP, deleteHTTP } from "../../api/helpers";

export default function FriendRequest({ friends, setFriends }) {
  const [requests, setRequests] = useState( [] );

  useEffect(() => {
    getHTTP("friends/pending").then((response) => {
      setRequests(response.data.users);
    });
  }, []);

  function AcceptRequest(userId) {
    putHTTP("friends/" + userId).then((response) => {
      if (response.success) {
        setFriends([requests.find(request => request.id == userId), ...friends]);
        setRequests(requests.filter((request) => request.id != userId));
      }
    });
  }

  function RejectRequest(userId) {
    deleteHTTP("friends/" + userId).then((response) => {
      if (response.success) {
        setRequests(requests.filter((request) => request.id != userId));
      }
    });
  }

  return (
    <div className="friendRequest">
      <h1>Friend Requests</h1>

      <Card className="friendRequestCard">
        <Card.Body className="overflow-auto"> 
          <ListGroup variant="flush">
            {requests.map((request) => (
              <ListGroup.Item className="d-flex justify-content-between align-items-center" key={request.id}>
                <span>
                  {request.display_name}
                </span>
                <div>
                  <Button className="card-button" onClick={ () => AcceptRequest(request.id) } > <FontAwesomeIcon icon={faCheck} /></Button>
                  <Button className="card-button" onClick={ () => RejectRequest(request.id) } > <FontAwesomeIcon icon={faXmark} /></Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

    </div> //closes the friendRequest div

  )
}
