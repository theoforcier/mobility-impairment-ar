import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.css";
import { Button , Card, ProgressBar, Col } from "react-bootstrap";
import "./Tasks.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { getHTTP, putHTTP } from "../../api/helpers";

// Progress bar component
const Progress = ({ progress, total }) => {
  let percentage = Math.floor((progress / total) * 100);
  percentage = Math.min(percentage, 100);

  return (
    <div style={{ minWidth: "350px" }}>
        <ProgressBar variant="custom-bar" now={percentage} label={`${percentage}%`}/>
    </div>
  );
};

const PersonalTaskCard = () => {
  // List of basic tasks
  const [basicTasks, setBasicTasks] = useState([]);

  // Fetch and store a user's uncompleted basic tasks
  useEffect(() => {
    let payload = {
      completed: 0
    }
    getHTTP("user/tasks/basic", payload).then((response) => {
      if (response.success) {
        // Adding progress field to each task object
        response.data.tasks.map(task => {
          task.progress = 0;
          return task;
        });

        setBasicTasks(response.data.tasks);

        // Updating progress for tasks that need it
        response.data.tasks.forEach(task => {
          if (task.label == "Add a friend") {
            checkAddFriendProgress(task);
          }
        });
      }
    });
  }, []);
  
  // Verify progress for "add x friends" tasks
  const checkAddFriendProgress = (task) => {
    getHTTP('friends').then(response => {
      let progress = 0;
      // Calculate progress
      if (response.success) {
        const recentFriends = response.data.users.filter(friend => {
          let friendDate = new Date(friend.created_at);
          let taskDate = new Date(task.created_at);
          return (friendDate >= taskDate);
        })
        progress = Math.min(recentFriends.length, task.quantity);
      } 

      // Updating basic task state (use callback function to get most recent version)
      setBasicTasks(updatedTasks => {return updatedTasks.map(t => {
        if (t.id == task.id) {
          return {...t, progress: progress};
        }
        return t;
      })});
    })
  };

  // Reroll task using task ID
  const rerollTask = (taskId) => {

    if (!window.confirm("Are you sure that you want to re-roll this task? \nAny progress made in this task so far will be deleted.")) {
      return
    }

    putHTTP("user/tasks/basic/" + taskId + "/reroll").then((response) => {
      if (response.success) {
        // Add the progress parameter which isn't there initially
        response.data.new_task.progress = 0;
        setBasicTasks([...basicTasks.filter(task => task.id != taskId), response.data.new_task]);
      }
    });
  };

  // Complete task using task ID
  const completeTask = (taskId) => {
    putHTTP("user/tasks/basic/" + taskId + "/complete").then((response) => {
      if (response.success) {
        // Add the progress parameter which isn't there initially
        response.data.new_task.progress = 0;
        setBasicTasks([...basicTasks.filter(task => task.id != taskId), response.data.new_task]);
      }
    });
  }

  return (
    <div className="task-section">
      <Col>
        <Card>
          <CardHeader> Personal Tasks</CardHeader>
          <Card.Body>
            {basicTasks.map((task, index) => (
              
              <div key={task.id}>

                <div className="d-flex justify-content-between align-items-center mb-3">

                  <Card.Title className="mt-2">{task.label}</Card.Title>

                  <div>
                    <Button
                        className="reroll-button btn-main"
                        onClick={ () => rerollTask(task.id) }
                        style={{ marginRight: "5px" }}
                      >
                      <FontAwesomeIcon icon={faRepeat} className="me-2" />
                      Re-Roll
                    </Button>

                    {(task.auto_completed == 0 || task.progress >= task.quantity) &&
                      <Button
                        className="complete-button btn-main"
                        onClick={ () => completeTask(task.id) }
                      >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    }
                  </div>
                </div>

                {task.auto_completed == 1 && (
                  <Progress progress={task.progress} total={task.quantity} />
                )}

                <div className="d-flex justify-content-between mt-3">

                  {task.auto_completed == 1 ? (
                    <Card.Subtitle>
                      {task.progress} of {task.quantity} {task.units}s
                    </Card.Subtitle>
                  ) : (
                    <Card.Subtitle>Ready to complete</Card.Subtitle>
                  )}

                  <Card.Subtitle>{task.points_reward} points</Card.Subtitle>
                </div>

                { (index != (basicTasks.length - 1)) ? <hr/> : null }
              </div>
            ))}

          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default PersonalTaskCard;
