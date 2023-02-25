import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button} from "react-bootstrap";
import "./Tasks.css";
import PersonalTaskCard from "./PersonalTaskCard";
import GroupTaskCard from "./GroupTaskCard";
import CreateTaskBtn from "./CreateTaskBtn";


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
          <GroupTaskCard></GroupTaskCard>
          <div className="bottom-5 end-5">
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
