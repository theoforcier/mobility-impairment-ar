import React, { useState, useEffect } from 'react';
import {Card, Button, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSave, faPencil } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

import { putHTTP } from '../../api/helpers';

export default function Info({ user, setUser }) {
  const [info, setInfo] = useState({ bio: "", email: "", display_name: "", first_name: "", last_name: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Store initial user information
  useEffect(() => {
    setInfo(user);
  }, [user]);

  // Update user information on form submit
  const submitHandler = (e) => {
    e.preventDefault();

    // Apply modifications
    let payload = {}
    const fields = ['first_name', 'last_name', 'bio', 'display_name', 'email']
    fields.forEach(field => {
      if (info[field] != user[field])
        payload[field] = info[field]
    })

    // Update database and component state
    putHTTP("user", payload).then((response) => {
      if (response.success) {
        setUser(response.data)
      }
    });
  }

  return (
    <div className="info mt-5">

      <FontAwesomeIcon className="profile-icon" icon={faUser} size="5x" />

      <Form className="mt-4" onSubmit={submitHandler}>
        <div className="fst-italic">
          {isEditing ? (
            <textarea className="form-control quote" size="sm" rows="2" defaultValue={user.bio} onChange={(e) => setInfo({ ...info, bio: e.target.value })}></textarea>
          ) : user.bio ? (
            <p className="quote">{user.bio}</p>
          ) : (
            <div>
              <i className="quote">Write something about yourself.</i>
            </div>
          )}
        </div>

        <Card className="mt-3 p-0">
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">

              <span>Personal Information</span>

              {isEditing ? (
                <Button className="edit-text" variant="primary" type="button" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <FontAwesomeIcon icon={faSave} size="sm" />
                  <span className="ms-2">Save</span>
                </Button>
              ) : user.isLoading ? 
                null
              : (
                <Button className="edit-text" variant="primary" type="submit" size="sm" disabled={user.isLoading} onClick={() => setIsEditing(!isEditing)}>
                  <FontAwesomeIcon icon={faPencil} size="sm" />
                  <span className="ms-2">Edit</span>
                </Button>
              )}
            </div>

          </Card.Header>

          <Card.Body>

            <div className="d-flex justify-content-center">
              <div style={{width: '90%'}}>

                <div className="row">
                  <div className="col-6 text-start fw-bold">Email Address</div>
                  <div className="col-6 text-end">
                    {isEditing ? (
                      <Form.Control size="sm" type="text" defaultValue={user.email} onChange={(e) => setInfo({ ...info, email: e.target.value })}/>
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </div>
                </div>


                <div className="row mt-2">
                  <div className="col-6 text-start fw-bold">Username</div>
                  <div className="col-6 text-end">
                    {isEditing ? (
                      <Form.Control size="sm" type="text" defaultValue={user.display_name} onChange={(e) => setInfo({ ...info, display_name: e.target.value })}/>
                    ) : (
                      <span>{user.display_name}</span>
                    )}
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-6 text-start fw-bold">First Name</div>
                  <div className="col-6 text-end">
                    {isEditing ? (
                      <Form.Control size="sm" type="text" defaultValue={user.first_name} onChange={(e) => setInfo({ ...info, first_name: e.target.value })}/>
                    ) : (
                      <span>{user.first_name}</span>
                    )}
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-6 text-start fw-bold">Last Name</div>
                  <div className="col-6 text-end">
                    {isEditing ? (
                        <Form.Control size="sm" type="text" defaultValue={user.last_name} onChange={(e) => setInfo({ ...info, last_name: e.target.value })}/>
                      ) : (
                        <span>{user.last_name}</span>
                      )}
                  </div>
                </div>

              </div>
            </div>
          </Card.Body>
        </Card>      
    
      </Form>

      <hr style={{ border: "1px solid black" }} />
    </div>
  );
}