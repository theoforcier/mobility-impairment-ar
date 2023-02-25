import React, { useState, useEffect } from 'react';
import {Button, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faPencil } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

import { putHTTP } from '../../api/helpers';

export default function Info({ user, setUser }) {
  const [info, setInfo] = useState({ bio: "", email: "", display_name: "", first_name: "", last_name: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setInfo(user);
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();

    let payload = {}
    const fields = ['first_name', 'last_name', 'bio', 'display_name', 'email']
    fields.forEach(field => {
      if (info[field] != user[field])    // field has changed
        payload[field] = info[field]
    })

    putHTTP("user", payload).then((response) => {
      if (response.success){
        setUser(response.data)
      }
    });
  }

  return (
    <div className="info">
      <br />
      <h1>My Profile</h1>
      <FontAwesomeIcon className="profile-icon" icon={faUser} size="5x" />
      <br />
      <br />
      <Form onSubmit={submitHandler}>
        <p>
          {isEditing ? (
            <Form.Control className="quote" size="sm" type="text" defaultValue={user.bio} onChange={(e) => setInfo({ ...info, bio: e.target.value })}/>
          ) : user.bio ? (
            <p className="quote">{user.bio}</p>
          ) : (
            <div>
              <i className="quote">Write something about yourself.</i>
              <br/>
            </div>
          )}
        </p>
        <p className="personal-information">Personal Information</p>
        
        <div className="d-flex justify-content-center">
        <div style={{width: '75%'}}>
          <div className="d-flex justify-content-between">
            <strong>Email Address: </strong>
            <div>
              {isEditing ? (
                <Form.Control size="sm" type="text" defaultValue={user.email} onChange={(e) => setInfo({ ...info, email: e.target.value })}/>
              ) : (
                <span>{user.email}</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <strong>Username: </strong>
            <div>
              {isEditing ? (
                <Form.Control size="sm" type="text" defaultValue={user.display_name} onChange={(e) => setInfo({ ...info, display_name: e.target.value })}/>
              ) : (
                <span>{user.display_name}</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <strong>First Name: </strong> 
            <div>
              {isEditing ? (
                <Form.Control size="sm" type="text" defaultValue={user.first_name} onChange={(e) => setInfo({ ...info, first_name: e.target.value })}/>
              ) : (
                <span>{user.first_name}</span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <strong>Last Name: </strong>
            <div>
              {isEditing ? (
                <Form.Control size="sm" type="text" defaultValue={user.last_name} onChange={(e) => setInfo({ ...info, last_name: e.target.value })}/>
              ) : (
                <span>{user.last_name}</span>
              )}
            </div>
          </div>
        </div>
        </div>

        <br></br>
        <Button className="change-password" variant="primary" type="button">
          <FontAwesomeIcon icon={faLock}/>
          <span className="ms-2">Change Password</span>
        </Button>

        {isEditing ? (
          <Button className="edit-text" variant="primary" type="button" onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={faPencil}/>
            <span className="ms-2">Save Info</span>
          </Button>
        ) : (
          <Button className="edit-text" variant="primary" type="submit" onClick={() => setIsEditing(!isEditing)}>
            <FontAwesomeIcon icon={faPencil}/>
            <span className="ms-2">Edit Info</span>
          </Button>
        )}
      </Form>

      <hr style={{ border: "1px solid black" }} />
    </div>
  );
}
