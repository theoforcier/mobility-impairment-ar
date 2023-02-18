import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap';
import { Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faUsers, faStar , faUserPlus} from "@fortawesome/free-solid-svg-icons";
import './MainUIBtn.css'

const MainUIBtn = () => {
    return(
        <Container className="position-fixed bottom-0 end-0 me-1" style={{zIndex: 9999 }}>
                <div className='mb-3'>
                <Button className="rounded-circle"> <FontAwesomeIcon icon={faUser} /></Button>
                </div>
                <div className='mb-3'>
                <Button className="rounded-circle"> <FontAwesomeIcon icon={faUsers} /></Button>
                </div>
                <div className='mb-3'>
                <Button className="rounded-circle"> <FontAwesomeIcon icon={faStar} /></Button>
                </div>
                <div className='mb-3'>
                <Button className="rounded-circle"> <FontAwesomeIcon icon={faUserPlus} /></Button>
                </div>
        </Container>
    );
}

export default MainUIBtn;