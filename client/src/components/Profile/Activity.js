import React from 'react'
import {Card} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faStar } from "@fortawesome/free-solid-svg-icons";

import 'bootstrap/dist/css/bootstrap.min.css'

export default function Activity({ user }) {
    return (
        <Card>
            <Card.Header>
                Total Activity
            </Card.Header>

            <Card.Body>

                <div className="d-flex justify-content-center">
                    <div style={{width: '90%'}}>

                        <div className="d-flex justify-content-between">
                            <div>
                                <FontAwesomeIcon icon={faMap} className="me-2" size="sm" />
                                <strong>Distance Travelled</strong>
                            </div>
                            <strong>{user.meters_travelled}</strong>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div>
                                <FontAwesomeIcon icon={faStar} className="me-2" size="sm" />
                                <strong>Points Earned</strong>
                            </div>
                            <strong>{user.points_total}</strong>
                        </div>

                    </div>
                </div>
            
            </Card.Body>
        </Card>
    )
}