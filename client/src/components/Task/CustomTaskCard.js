import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare, faCheck} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Card, ProgressBar, Col, Modal } from "react-bootstrap";
import "./Tasks.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { getHTTP, putHTTP, deleteHTTP } from "../../api/helpers";

const CustomTaskCard = ({ ChangePage }) => {
  const [showModal, setShowModal] = useState(false);
  const [customTasks, setCustomTasks] = useState([]);

  useEffect(() => {
    getHTTP("user/tasks/custom").then((response) => {
      if (response.success) {
        // Setting custom task state
        setCustomTasks(response.data.tasks);
      }
    });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const saveTask = () => {
    console.log(JSON.parse(JSON.stringify(customTasks)));
    setShowModal(false);
  };

  const deleteTask = (taskId) => {
    console.log(taskId);
    deleteHTTP("user/tasks/custom/" + taskId).then((response) => {
      if (response.success) {
        setCustomTasks(customTasks.filter((task) => task.id != taskId));
      }
    });
    setShowModal(false);
  };

  return (
    <div className="task-section">
      <Col>
        <Card>
          <CardHeader> Custom Tasks</CardHeader>
          {customTasks.map((task) => (
            <Card.Body>
              <Card.Title>{task.name}</Card.Title>
              <Card.Subtitle>
                {task.description}<br></br>
                {task.points_reward} points
              </Card.Subtitle>
              <Card.Text>
                <div className="button-group-container">
                  <Button
                    className="card-button"
                    onClick={handleShowModal}
                    style={{ marginRight: "5px" }}
                  >
                    <FontAwesomeIcon icon={faPencilSquare} />
                  </Button>
                  <Button className="card-button">
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
                          defaultValue={task.name}
                          //   value={editedName}
                          //   onChange={(e) => setEditedName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formTaskGoal">
                        <Form.Label>Task Goal</Form.Label>
                        <Form.Control
                        type="test"
                        defaultValue={task.description}
                        //   type="number"
                        //   value={editedGoal}
                        //   onChange={(e) => setEditedGoal(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={ () => deleteTask(task.id) }>
                      Delete
                    </Button>
                    <Button variant="primary" onClick={ () => saveTask() }>
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
  );
};

export default CustomTaskCard;
