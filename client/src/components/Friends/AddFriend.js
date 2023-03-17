import { useState } from "react";
import React from 'react'
import {Button, Card, Form, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { postHTTP } from "../../api/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

export default function AddFriend() {
  // New friend form state
  const [newFriend, setNewFriend] = useState({ display_name: "" });
  // Success/error message when adding friends
  const [message, setMessage] = useState({ text: "", type: "" });

  // Send friend request through API
  const sendRequest = () => {
    // If nothing is entered
    if (newFriend.display_name == "") {
      setMessage({ text: "Please enter a username.", type: "danger" });
      return;
    }
    postHTTP("friends", newFriend).then((response) => {
      // If user exists, set success message
      if (response.success) {
        setMessage({ text: "Friend request sent!", type: "success" })
      // If user DNE or friend request already sent, set error message
      } else {
        setMessage({ text: response.message, type: "danger" });
      }
    });
  }

  // Form handler
  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest()
  }

  return (
    <div className="add-friends">

      <Card>
        <Card.Header className="text-center">Add a Friend</Card.Header>
      </Card>

      <form className='friend-form mt-2 mb-4' id='friend-form' onSubmit={submitHandler}>
          <Form.Group className="d-flex" controlId='formUsername'>
              <Form.Control type="text" placeholder='Find a Player by Username' className="me-1" onChange={(e) => setNewFriend({ display_name: e.target.value })} />
              <Button className="send-button" type="submit"> 
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
          </Form.Group>
          <div className="text-center mt-2 mb-2">
            {message.text != "" ? <Alert key={message.type} variant={message.type} className="py-2">{message.text}</Alert> : ""}
          </div>
      </form>
    </div>
  )
}
