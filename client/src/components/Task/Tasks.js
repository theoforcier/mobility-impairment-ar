import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Card, ProgressBar, Col } from "react-bootstrap";
import "./Tasks.css";
import CardHeader from "react-bootstrap/esm/CardHeader";

const taskList = [
  { name: "Travel 800m", progress: 621, total: 800, points: 20 },
  { name: "Travel 900m", progress: 780, total: 900, points: 14 },
  { name: "Travel 1000m", progress: 340, total: 1000, points: 30 },
];

const Progress = ({ progress, total }) => {
  const percentage = Math.floor((progress / total) * 100);

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div style={{ minWidth: "350px" }}>
        <ProgressBar now={percentage} label={`${percentage}%`} />
      </div>
    </div>
  );
};

const Tasks = ({ ChangePage }) => {
  return (
    <div className="Tasks">
      <div style={{ margin: "10px" }}>
        <h1 style={{ marginTop: "30px", marginLeft: "10px" }}>
          <b>My Tasks</b>
        </h1>
      </div>
      <div className="row justify-content-center">
        <div>
          <br></br>
          <Col md={6}>
            <Card>
              <CardHeader> Personal Tasks</CardHeader>
              {taskList.map((task, index) => (
                <Card.Body>
                  <Card.Title>{task.name}</Card.Title>
                  <Card.Subtitle>
                    {task.progress}m of {task.total}m travelled<br></br>
                    {task.points} points
                  </Card.Subtitle>
                  <Card.Text>
                    <Progress progress={task.progress} total={task.total} />
                  </Card.Text>
                </Card.Body>
              ))}
            </Card>
          </Col>
          <br></br>
          <hr></hr>
          <Col md={6}>
            <Card>
              <CardHeader> Group Tasks</CardHeader>
              <Card.Body>
                <Card.Title>Travel 800m</Card.Title>
                <Card.Subtitle>621m of 800m travelled</Card.Subtitle>
                <Card.Text>
                  <Progress progress={621} total={800} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <br></br>
          <br></br>
          <Container className="bottom-0 end-1">
            <Button
              className="rounded-circle"
              onClick={() => ChangePage("main")}
            >
              {" "}
              <FontAwesomeIcon icon={faXmark} />{" "}
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
