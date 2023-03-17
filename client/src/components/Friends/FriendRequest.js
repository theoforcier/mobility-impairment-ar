import { useState, useEffect } from "react";
import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

import { getHTTP, putHTTP, deleteHTTP } from "../../api/helpers";

export default function FriendRequest({ friends, setFriends }) {
  // User's current friend requests
  const [requests, setRequests] = useState( [] );

  // Fetch and store friend requests
  useEffect(() => {
    getHTTP("friends/pending").then((response) => {
      setRequests(response.data.users);
    });
  }, []);

  // Accept request, updating current requests/friends 
  function AcceptRequest(userId) {
    putHTTP("friends/" + userId).then((response) => {
      if (response.success) {
        setFriends([requests.find(request => request.id == userId), ...friends]);
        setRequests(requests.filter((request) => request.id != userId));
      }
    });
  }

  // Delete request, updating current requests
  function RejectRequest(userId) {
    deleteHTTP("friends/" + userId).then((response) => {
      if (response.success) {
        setRequests(requests.filter((request) => request.id != userId));
      }
    });
  }

  return (
    <div className="friendRequest">

      <Card className="friendRequestCard">

        <Card.Header>Friend Requests</Card.Header>

        <Card.Body className="overflow-auto"> 

          { requests.length ? 

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

          : <div className="text-center">No requests found.</div>

          }
          
        </Card.Body>
      </Card>

    </div> //closes the friendRequest div

  )
}
