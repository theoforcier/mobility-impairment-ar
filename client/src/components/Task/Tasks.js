import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import "./Tasks.css";
import PersonalTaskCard from "./PersonalTaskCard";
import GroupTaskCard from "./GroupTaskCard";
import CreateTaskBtn from "./CreateTaskBtn";
import CustomTaskCard from "./CustomTaskCard";

const Tasks = ({ ChangePage }) => {
  return (
    <div className="Tasks">
      <div>
        <h1 style={{ textAlign: "center" }}>My Tasks</h1>
      </div>
      <div className="row justify-content-center">
        <div>
          <br></br>
          <PersonalTaskCard></PersonalTaskCard>
          <br></br>
          <hr></hr>
          <CustomTaskCard></CustomTaskCard>
          <br></br>
          <hr></hr>
          <GroupTaskCard></GroupTaskCard>
          <br></br>
          <br></br>
          <div
            className="fixed-bottom"
            style={{
              right: "auto",
              left: "0",
              marginTop: "30px",
              marginRight: "20px",
            }}
          >
            <Button
              className="rounded-circle"
              onClick={() => ChangePage("main")}
            >
              <FontAwesomeIcon icon={faXmark} />{" "}
            </Button>
          </div>
          <CreateTaskBtn></CreateTaskBtn>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
