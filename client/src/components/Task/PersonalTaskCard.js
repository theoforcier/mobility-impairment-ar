import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faCheck } from "@fortawesome/free-solid-svg-icons";
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

  const checkAddFriendProgress = () => {

  };

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
                  <Card.Text>
                    0 of {task.quantity}m travelled<br></br>
                    {task.points_reward} points
                  </Card.Text>
                  <Progress progress={task.progress} total={task.quantity} />
                  <Card.Text>
                    <div className="button-group-container">
                      <Button
                        className="edit-button rounded-circle"
                        onClick={handleShowModal}
                        style={{ marginRight: "5px" }}
                      >
                        <FontAwesomeIcon icon={faPencilSquare} />
                      </Button>
                      <Button className="complete-button rounded-circle">
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                              type="text"
                              //   value={editedName}
                              //   onChange={(e) => setEditedName(e.target.value)}
                            />
                          </Form.Group>

                          <Form.Group controlId="formTaskGoal">
                            <Form.Label>Task Goal</Form.Label>
                            <Form.Control
                            //   type="number"
                            //   value={editedGoal}
                            //   onChange={(e) => setEditedGoal(e.target.value)}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete}>
                          Delete
                        </Button>
                        <Button variant="primary" onClick={handleSaveModal}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
