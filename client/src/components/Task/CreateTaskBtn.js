import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, Modal } from "react-bootstrap";
import "./Tasks.css";

const CreateTaskBtn = ({ ChangePage }) => {
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

  return (
    <div
      className="fixed-bottom"
      style={{
        right: "0",
        left: "auto",
        marginTop: "30px",
        marginRight: "20px",
      }}
    >
      <Button className="rounded-circle" onClick={handleShowModal}>
        <FontAwesomeIcon icon={faPlus} />{" "}
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
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
          <Button variant="primary" onClick={handleSaveModal}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateTaskBtn;
