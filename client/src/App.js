import { useState } from "react";
import LoginForm from "./components/LoginForm";

function App() {
  // Temporary admin user, still needs to be connected to database
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  // Boolean which tells us if we are on 
  let isSignup = false;

  // Stores user data after logging in (MISSING TOKEN?)
  const [user, setUser] = useState({ email: "" });
  // Catch invalid login/signup
  const [error, setError] = useState("");

  // Login function
  const Login = (details) => {
    console.log(details);

    if (
      details.email == adminUser.email &&
      details.password == adminUser.password
    ) {
      console.log("Logged in!");
      setUser({
        email: details.email,
      });
    } else {
      console.log("Invalid login!");
      setError("Email or password is incorrect!");
    }
  };

  // Signup function
  const Signup = (details) => {
    console.log(details);
    // Check if email is already registered

    // Create db entry
  }

  // Logout function
  const Logout = () => {
    setUser({ username: "", email: "" });
  };

  // Switch between login/signup forms
  const SwitchScreen = () => {
    isSignup = !isSignup;
  }

  // If logged in display welcome, if not display login form
  return (
    <div className="App">
      {user.email != "" ? (
        <div className="welcome">
          <h2>
            Welcome, <span>{user.username}</span>
          </h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        // Must pass login/signup functions and error to our forms
        <LoginForm Login={Login} error={error} />
      )}
    </div>
  );
}

export default App;
