import React from 'react'
import {Button, Form, Card} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser,faUsers, faStar , faUserPlus} from "@fortawesome/free-solid-svg-icons"

export default function Activity({ user }) {
    return (
        <div className="activity">
            <h1>Total Activity</h1>

            <div className="d-flex justify-content-center">
                <div style={{width: '75%'}}>
                    <div className="d-flex justify-content-between">
                        <strong>Distance Travelled: </strong>
                        <span>{user.meters_travelled}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <strong>Points Earned: </strong>
                        <span>{user.points_total}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}