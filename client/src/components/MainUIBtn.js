import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faUsers, faStar , faUserPlus} from "@fortawesome/free-solid-svg-icons";

const MainUIBtn = () => {
    return(
        <div className="position-fixed bottom-0 end-0 p-3" style={{ height: "50px", width: "50px", position: 'absolute', top: 450, left: 650, zIndex: 9999 }}>
            <Button className="rounded-circle me-4" variant="primary"> <FontAwesomeIcon icon={faUser} /></Button>

            <Button className="rounded-circle me-4" variant="primary"> <FontAwesomeIcon icon={faUsers} /></Button>
            <Button className="rounded-circle" variant="primary"> <FontAwesomeIcon icon={faStar} /></Button>
            <Button className="rounded-circle" variant="primary"> <FontAwesomeIcon icon={faUserPlus} /></Button>
        </div>
        
    );
}

export default MainUIBtn;