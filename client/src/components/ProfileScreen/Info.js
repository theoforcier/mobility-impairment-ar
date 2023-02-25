import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faStar, faLock, faPencil } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Info() {
  const [quote, setQuote] = useState("I love long walks on the beach!");
  const [isEditingQuote, setIsEditingQuote] = useState(false);
  const handleQuoteChange = (e) => {
    setQuote(e.target.value);
  };

  return (
    <div className="info">
      <br />
      <h1>My Profile</h1>

      <Form>
        <FontAwesomeIcon className="profile-icon" icon={faUser} size="5x" />
        <br />
        <br />
        {isEditingQuote ? (
          <Form.Control className="quote" as="textarea" value={quote} onChange={handleQuoteChange}/>
        ) : (
          <p className="quote">{quote}</p>
        )}
        <p className="personal-information">Personal Information</p>
        
        <div className="d-flex justify-content-center">
        <div style={{width: '75%'}}>
          <div className="d-flex justify-content-between">
            <strong>Email Address: </strong>
            <span></span>
          </div>
          <div className="d-flex justify-content-between">
            <strong>Username: </strong>
            <span></span>
          </div>
          <div className="d-flex justify-content-between">
            <strong>First Name: </strong> 
            <span></span>
          </div>
          <div className="d-flex justify-content-between">
            <strong>Last Name: </strong>
            <span></span>
          </div>
        </div>
        </div>

        <br></br>
        <Button className="change-password" variant="primary" type="submit">
          <FontAwesomeIcon icon={faLock}/>
          <span className="ms-2">Change Password</span>
        </Button>

        <Button className="edit-text" variant="primary" type="button" onClick={() => setIsEditingQuote(!isEditingQuote)}>
          <FontAwesomeIcon icon={faPencil}/>
          <span className="ms-2">{isEditingQuote ? "Save Text" : "Edit Text"}</span>
        </Button>
      </Form>

      <hr style={{ border: "1px solid black" }} />
    </div>
  );
}
