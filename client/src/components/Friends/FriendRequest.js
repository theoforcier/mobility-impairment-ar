import { useState, useEffect } from "react";
import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { getHTTP } from "../../api/helpers";

export default function FriendRequest() {
  const [requests, setRequests] = useState( [] );

  useEffect(() => {
    getHTTP("friends/pending").then((response) => {
      setRequests(response.data.users);
    });
  }, []);

  return (
    <div className="friendRequest">
      <h1>Friend Requests</h1>

      <Card className="friendRequestCard">
        <Card.Body className="overflow-auto"> 
          <ListGroup variant="flush">
            {requests.map((request) => (
              <ListGroup.Item key={request.display_name}>{request.display_name}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

    </div> //closes the friendRequest div

  )
}
