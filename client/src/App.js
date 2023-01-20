import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"
import { postHTTP, getHTTP } from "./api/helpers"

function App() {
  // Stores user data after logging in / signing up
  const [user, setUser] = useState({ token: "" });
  // Keeps track of current page
  const [isLogin, setIsLogin] = useState({ isLogin: true })
  // Catch invalid login/signup
  const [error, setError] = useState("");

  // Login function
  const Login = (loginDetails) => {
    console.log(loginDetails);
    setError("");

    let payload = {
      'email': loginDetails.email,
      'password': loginDetails.password
    }

    // Send login request to API
    postHTTP('login', payload).then(response => {
      // If login succeeds, set user token
      if (response.success) {
        console.log(response);
        setUser(response.data.token);
      // If login fails, set error message
      } else {
        console.log(response.data);
        setError("Email or password is incorrect!");
      }
    })
  };

  // Logout function, return to login page
  const Logout = () => {
    setUser({ token: "" });
    setIsLogin({ isLogin: true })
  };

  // Signup function
  const Signup = (signupDetails) => {
    console.log(signupDetails);
    setError("");

    let payload = {
      'name': signupDetails.firstName + " " + signupDetails.lastName,
      'email': signupDetails.email,
      'password': signupDetails.password,
      'c_password': signupDetails.confirmPass
    }

    // Send register request to API
    postHTTP('register', payload).then(response => {
      // If register succeeds, set user token (log in)
      if (response.success) {
        console.log(response);
        setUser(response.data.token);
      // If register fails, set error message
      } else {
        console.log(response.data);
        setError("Email already in use!");
      }
    })
  }

  // SwitchPage function
  const SwitchPage = () => {
    setError("");
    setIsLogin(!isLogin);
  }

  // If logged in display welcome, if not display correct form
  return (
    <div className="App">
      {user.token != "" ? (
        <div className="welcome">
          <h2>
            Welcome!
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        // Must pass login/signup/switchscreen functions and error to our forms
        isLogin ? (
          <LoginForm Login={Login} SwitchPage={SwitchPage} error={error} />
        ) : (
          <SignupForm Signup={Signup} SwitchPage={SwitchPage} error={error} />
        )
      )}
    </div>
  );
}

export default App;
