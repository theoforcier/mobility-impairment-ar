import { useState } from "react";
import React from 'react'
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { postHTTP } from "../../api/helpers";

export default function AddFriend() {
  const [newUser, setNewUser] = useState({ display_name: "" });

  // Send friend request through API
  const sendRequest = () => {
    postHTTP("friends", newUser).then((response) => {
      // If user exists
      if (response.success) {
        console.log(response.data)
      // If user DNE or friend request already sent
      } else {
        console.log(response.data)
      }
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest()
  }

  return (
    <div>
      <br></br>
        <h1>Add Friends</h1>
        <form className='friend-form' onSubmit={submitHandler}>
            <Form.Group controlId='formUsername'>
                <Form.Control className="mx-auto" type="text" placeholder='Enter Username of Player' size='lg' onChange={(e) => setNewUser({ display_name: e.target.value })} />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit"> Send Request </Button>
        </form>
        <hr style={{ border: "1px solid black" }} />
    </div>
  )
}
