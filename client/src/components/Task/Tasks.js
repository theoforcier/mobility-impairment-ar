import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card } from "react-bootstrap";
import "./Tasks.css";
import PersonalTaskCard from "./PersonalTaskCard";
import GroupTaskCard from "./GroupTaskCard";
import CustomTaskCard from "./CustomTaskCard";

const Tasks = ({ ChangePage }) => {
  return (
    <div className="Tasks p-3">

      <div className="row justify-content-center pb-4">
        <div style={{minWidth: '40%', maxWidth: '500px'}}>
          <Card className="text-center p-2 pt-3">
            <h2>My Tasks</h2>
          </Card>
          <div>
            <div>
              <br/>
              <PersonalTaskCard></PersonalTaskCard>
              <hr/>
              <CustomTaskCard></CustomTaskCard>
              <br/>
              <br/>
              {/* 
              <GroupTaskCard></GroupTaskCard>
              <br></br>
              */}
              <div className="fixed-bottom d-flex justify-content-end m-4">
                <Button
                  className="rounded-circle"
                  onClick={() => ChangePage("main")}
                >
                  <FontAwesomeIcon icon={faXmark} size="xl" />{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
