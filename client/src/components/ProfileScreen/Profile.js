import Info from './Info';
import Activity from './Activity'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="Profile">
        <Info />
        <Activity />
        <br></br>
        
        <div className="d-flex justify-content-left">
        <Button className="rounded-circle"> <FontAwesomeIcon icon={faXmark}/> </Button>
        </div>
        
        <br></br>
        <br></br>
        <br></br>
    </div>
  );
}

export default App;
