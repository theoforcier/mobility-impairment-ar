import { Button, componentDidMount } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faUsers, faStar , faUserPlus} from "@fortawesome/free-solid-svg-icons";

import './MainUIBtn.css'

const MainUIBtn = ({ ChangePage }) => {

    const resolution = window.innerWidth;
    const isMobile = resolution >= 320 && resolution <= 480;

    return(
        <div className="position-fixed bottom-0 d-flex justify-content-end w-100" style={{zIndex: 9999 }}>

            <div className="d-flex flex-column m-4">

                <Button className="rounded-circle page-btn mb-3" onClick={() => ChangePage("profile", "")}>
                     <FontAwesomeIcon icon={faUser} size="lg" />
                </Button>
                {/*<Button className="rounded-circle mb-3"> <FontAwesomeIcon icon={faUsers} /></Button>*/}

                <Button className="rounded-circle page-btn mb-3" onClick={() => ChangePage("tasks", "")}> 
                    <FontAwesomeIcon icon={faStar} size="lg" />
                </Button>

                <Button className="rounded-circle mb-3" onClick={() => ChangePage("friends", "")}> 
                    <FontAwesomeIcon icon={faUserPlus} size="lg" />
                </Button>

            </div>

        </div>
    );
}

export default MainUIBtn;