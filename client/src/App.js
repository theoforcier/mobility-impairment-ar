import { useState } from "react";
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { postHTTP, getHTTP } from "./api/helpers";
import { PAGES } from "./pages";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import GeoMap from "./components/GeoMap";

function App() {
  // Stores user data after logging in / signing up
  const [user, setUser] = useState({ token: "" });
  // Keeps track of current page
  const [page, setPage] = useState(PAGES.LOGIN);
  // Catch invalid login/signup
  const [error, setError] = useState("");

  // ChangePage function
  const ChangePage = (newPage) => {
    setError("");
    setPage(newPage);
  };

  // Login function
  const Login = (loginDetails) => {
    setError("");

    let payload = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    // Send login request to API
    postHTTP("login", payload).then((response) => {
      // If login succeeds, set user token
      if (response.success) {
        setUser({ token: response.data.token });
        // If login fails, set error message
      } else {
        setError("Email or password is incorrect!");
      }
    });
  };

  // Logout function, return to login page
  const Logout = () => {
    setUser({ token: "" });
    ChangePage(PAGES.LOGIN);
  };

  // Signup function
  const Signup = (signupDetails) => {
    setError("");

    let payload = {
      first_name: signupDetails.firstName,
      last_name: signupDetails.lastName,
      email: signupDetails.email,
      display_name: signupDetails.username,
      password: signupDetails.password,
      c_password: signupDetails.confirmPass,
    };

    // Send register request to API
    postHTTP("register", payload).then((response) => {
      // If register succeeds, set user token (log in)
      if (response.success) {
        setUser({ token: response.data.token });
        // If register fails, set error message
      } else {
        setError("Username or email already in use!");
      }
    });
  };

  // If logged in (token is set) display map, if not display correct form
  return (
    <div className="App">
      {user.token != "" ? (
        <GeoMap className='MapContainers' />
      ) : // Must pass login/signup/changepage functions and error to our forms
      page == PAGES.LOGIN ? (
        <div className="Form">
          <LoginForm Login={Login} ChangePage={ChangePage} error={error} />
        </div>
      ) : (
        <div className="Form">
          <SignupForm Signup={Signup} ChangePage={ChangePage} error={error} />
        </div>
      )}
    </div>
  );
}

export default App;
