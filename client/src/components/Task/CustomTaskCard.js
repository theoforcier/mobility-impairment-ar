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
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    let payload = {
      completed: 0
    }
    getHTTP("user/tasks/custom", payload).then((response) => {
      if (response.success) {
        // Setting custom task state
        setCustomTasks(response.data.tasks);
      }
    });
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };

  const saveTask = () => {
    let payload = {
      description: currentTask.description
    }
    // Updating tasks and modifying database
    putHTTP("user/tasks/custom/" + currentTask.id + "/rename", payload).then((response) => {
      if (response.success) {
        const updatedCustomTasks = [...customTasks];
        const taskIndex = updatedCustomTasks.findIndex((task) => task.id == currentTask.id);
        updatedCustomTasks[taskIndex].description = currentTask.description;
        setCustomTasks(updatedCustomTasks);
      }
    });
    setShowModal(false);
  };

  const deleteTask = (taskId) => {
    deleteHTTP("user/tasks/custom/" + taskId).then((response) => {
      if (response.success) {
        setCustomTasks(customTasks.filter((task) => task.id != taskId));
      }
    });
    setShowModal(false);
  };

  const completeTask = (taskId) => {
    putHTTP("user/tasks/custom/" + taskId + "/complete").then((response) => {
      if (response.success) {
        console.log(response);
        setCustomTasks(customTasks.filter((task) => task.id != taskId));
      }
    });
  }

  return (
    <div>
      <div className="task-section">
        <Col>
          <Card>
            <CardHeader> Custom Tasks</CardHeader>
            {customTasks.map((task) => (
              <Card.Body>
                <Card.Title>{task.description}</Card.Title>
                <Card.Subtitle>
                  {task.points_reward} points
                </Card.Subtitle>
                <Card.Text>
                  <div className="button-group-container">
                    <Button
                      className="card-button"
                      onClick={ () => handleShowModal(task) }
                      style={{ marginRight: "5px" }}
                    >
                      <FontAwesomeIcon icon={faPencilSquare} />
                    </Button>
                    <Button 
                      className="card-button"
                      onClick={ () => completeTask(task.id) }
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
      <div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTaskGoal">
                <Form.Label>Task Goal</Form.Label>
                <Form.Control
                type="test"
                defaultValue={currentTask ? currentTask.description : ""}
                onChange={(e) => {
                  const newTask = { ...currentTask, description: e.target.value };
                  setCurrentTask(newTask);
                }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={ () => deleteTask(currentTask.id) }>
              Delete
            </Button>
            <Button variant="primary" onClick={ () => saveTask(currentTask.id) }>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default CustomTaskCard;
