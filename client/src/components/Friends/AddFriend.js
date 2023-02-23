import { useState } from "react";
import React from 'react'
import {Button, Container, Form, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { postHTTP } from "../../api/helpers";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function AddFriend() {
  const [newFriend, setNewFriend] = useState({ display_name: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Send friend request through API
  const sendRequest = () => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest()
  }

  return (
    <div className="add-friends">
      <br></br>
        <h1>Add Friends</h1>
        <form className='friend-form' id='friend-form' onSubmit={submitHandler}>
            <Form.Group controlId='formUsername'>
                <Form.Control className="mx-auto" type="text" placeholder='Enter Username of Player' size='lg' onChange={(e) => setNewFriend({ display_name: e.target.value })} />
            </Form.Group>
            <br />
            <Container className="d-flex justify-content-between align-items-baseline">
              <span>
                <Button className="send-button" type="submit"> Send Request </Button>
              </span>
              {message.text != "" ? <Alert key={message.type} variant={message.type}>{message.text}</Alert> : ""}
            </Container>
        </form>
        <hr style={{ border: "1px solid black" }} />
    </div>
  )
}
