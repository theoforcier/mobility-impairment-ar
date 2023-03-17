import { useState, useTransition } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { postHTTP } from "./api/helpers";
import { PAGES } from "./pages";
import LoginForm from "./components/LandingForms/LoginForm";
import SignupForm from "./components/LandingForms/SignupForm";
import GeoMap from "./components/MainUI/GeoMap";
import Profile from "./components/Profile/Profile";
import Friends from "./components/Friends/Friends";
import FriendProfile from "./components/Profile/FriendProfile";
import Tasks from "./components/Task/Tasks";
import DistanceTracker from "./DistanceTracker";

function App() {
  // Stores user data after logging in / signing up
  const [user, setUser] = useState({ token: "" });
  // Keeps track of current page
  const [page, setPage] = useState({ current: PAGES.LOGIN, modifier: "" });
  // Catch invalid login/signup
  const [error, setError] = useState("");
  // Boolean for distance tracking
  const [trackDistance, setTrackDistance] = useState(false);

  // ChangePage function
  const ChangePage = (newPage, mod) => {
    setError("");
    if (newPage == PAGES.MAIN ||
        newPage == PAGES.FRIENDS ||
        newPage == PAGES.FRIEND_PROFILE ||
        newPage == PAGES.TASKS ||
        newPage == PAGES.PROFILE) {
          setTrackDistance(true);
    }
    else {
      setTrackDistance(false);
    }
    setPage({ current: newPage, modifier: mod });
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
        if ('token' in response.data && response.data.token) {
          const userToken = response.data.token.split('|')[1];
          localStorage.setItem('token', userToken);
          setUser({ token: userToken });
          ChangePage(PAGES.MAIN, "");
        } 
      // If login fails, set error message
      } else {
        setError("Email or password is incorrect!");
      }
    });
  };

  // Logout function, return to login page
  const Logout = () => {
    setUser({ token: "" });
    ChangePage(PAGES.LOGIN, "");
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
        if ('token' in response.data && response.data.token) {
          const userToken = response.data.token.split('|')[1];
          localStorage.setItem('token', userToken);
          setUser({ token: userToken });
          ChangePage(PAGES.MAIN, "");
        } 
        // If register fails, set error message
      } else {
        setError("Username or email already in use!");
      }
    });
  };

  // Display appropriate page/form
  return (
    <div className="App">
      {trackDistance && <DistanceTracker/>}
      {page.current == PAGES.MAIN ? (
        <GeoMap className="MapContainers" ChangePage={ChangePage} />
      ) : page.current == PAGES.PROFILE ? (
        <Profile ChangePage={ChangePage} />
      ) : page.current == PAGES.FRIENDS ? (
        <Friends ChangePage={ChangePage} />
      ) : page.current == PAGES.FRIEND_PROFILE ? (
        <FriendProfile ChangePage={ChangePage} page={page} />
      ) : page.current == PAGES.TASKS ? (
        <Tasks ChangePage={ChangePage} />
      ) : // Must pass login/signup/changepage functions and error to our forms
      page.current == PAGES.LOGIN ? (
        <div className="Landing">
          <LoginForm Login={Login} ChangePage={ChangePage} error={error} setError={setError} />
        </div>
      ) : (
        <div className="Landing">
          <SignupForm Signup={Signup} ChangePage={ChangePage} error={error} setError={setError} />
        </div>
      )}
    </div>
  );
}

export default App;
