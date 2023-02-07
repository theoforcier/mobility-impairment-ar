import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import { postHTTP, getHTTP } from "./api/helpers";
import { PAGES } from "./pages";
import {BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import GeoMap from "./components/GeoMap"
import "App.css"

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
    console.log(loginDetails);
    setError("");

    let payload = {
      email: loginDetails.email,
      password: loginDetails.password,
    };

    // Send login request to API
    postHTTP("login", payload).then((response) => {
      // If login succeeds, set user token
      if (response.success) {
        console.log(response);
        setUser({ token: response.data.token });
        // If login fails, set error message
      } else {
        console.log(response.data);
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
        console.log(response);
        setUser({ token: response.data.token });
        // If register fails, set error message
      } else {
        console.log(response.data);
        setError("Registration error!");
      }
    });
  };

  // If logged in (token is set) display welcome, if not display correct form
  return (
    <div className="App">
      {user.token != "" ? (
        <GeoMap className='MapContainers' />
      ) : // Must pass login/signup/changepage functions and error to our forms
      page == PAGES.LOGIN ? (
        <LoginForm Login={Login} ChangePage={ChangePage} error={error} />
      ) : (
        <SignupForm Signup={Signup} ChangePage={ChangePage} error={error} />
      )}
    </div>
  );
}

export default App;
