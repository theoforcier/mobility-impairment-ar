import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faCheck} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Card, ProgressBar, Col, Modal } from "react-bootstrap";
import "./Tasks.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { getHTTP, putHTTP } from "../../api/helpers";

const taskList = [
  { name: "Travel 800m", progress: 621, total: 800, points: 20 },
  { name: "Travel 900m", progress: 780, total: 900, points: 14 },
];

const CustomTaskCard = ({ ChangePage }) => {
  /*useEffect(() => {
    getHTTP("user/tasks/basic").then((response) => {
      if (response.success) {
        response.tasks.foreach(task => {
          //MODIFY TASKLIST
        })
      }
    });
  }, []);*/

  const [showModal, setShowModal] = useState(false);
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
              <CardHeader> Custom Tasks</CardHeader>
              {taskList.map((task) => (
                <Card.Body>
                  <Card.Title>{task.name}</Card.Title>
                  <Card.Subtitle>
                    {task.progress}m of {task.total}m travelled<br></br>
                    {task.points} points
                  </Card.Subtitle>
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

export default CustomTaskCard;
