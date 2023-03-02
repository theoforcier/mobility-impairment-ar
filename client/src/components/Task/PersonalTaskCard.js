import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilSquare,
  faCheck,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Card, ProgressBar, Col, Modal } from "react-bootstrap";
import "./Tasks.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { getHTTP, putHTTP } from "../../api/helpers";

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

const PersonalTaskCard = ({ ChangePage }) => {
  const [showModal, setShowModal] = useState(false);
  const [basicTasks, setBasicTasks] = useState([]);

  useEffect(() => {
    getHTTP("user/tasks/basic").then((response) => {
      if (response.success) {
        setBasicTasks(response.data.tasks);
      }
    });
    console.log(basicTasks);
  }, []);

  const checkAddFriendProgress = () => {};

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleSaveModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    setShowModal(false);
  };

  const handleReroll = () => {};

  const handleComplete = () => {};

  return (
    <div>
      <div className="row justify-content-center">
        <div>
          <Col md={6}>
            <Card>
              <CardHeader> Personal Tasks</CardHeader>
              {basicTasks.map((task) => (
                <Card.Body>
                  <Card.Title>{task.label}</Card.Title>
                  {task.quantity > 1 ? (
                    <Card.Subtitle>
                      0 of {task.quantity}m travelled<br></br>
                      {task.points_reward} points
                      {task.progress == 0 ? (
                        <Progress progress={0} total={task.quantity} />
                      ) : (
                        <Progress
                          progress={task.progress}
                          total={task.quantity}
                        />
                      )}
                    </Card.Subtitle>
                  ) : (
                    <Card.Subtitle>{task.points_reward} points</Card.Subtitle>
                  )}

                  <Card.Text>
                    <div className="button-group-container">
                      <Button
                        className="edit-button rounded-circle"
                        onClick={handleReroll}
                        style={{ marginRight: "5px" }}
                      >
                        <FontAwesomeIcon icon={faRepeat} />
                      </Button>
                      <Button
                        className="complete-button rounded-circle"
                        onClick={handleComplete}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>
                  </Card.Text>
                </Card.Body>
              ))}
            </Card>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default PersonalTaskCard;
