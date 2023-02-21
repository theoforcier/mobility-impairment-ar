import React from 'react'
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddFriend() {
  return (
    <div>
      <br></br>
        <h1>Add Friends</h1>

        <Form>

            <Form.Group controlId='formUsername'>
                <Form.Control className="mx-auto" type="text" placeholder='Enter Username of Player' size='lg' />
            </Form.Group>

            <br />
            <Button variant="primary" type="submit"> Send Request </Button>

        </Form>

        

        <hr style={{ border: "1px solid black" }} />
    </div>
  )
}
