import { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm"

function App() {
  // Temporary admin user, still needs to be connected to database
  const adminUser = {
    email: "admin@admin.com",
    password: "admin123",
  };

  // Stores user data after logging in (MISSING TOKEN?)
  const [user, setUser] = useState({ email: "" });
  // Keeps track of current page
  const [isLogin, setIsLogin] = useState({ isLogin: true })
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

  // Logout function
  const Logout = () => {
    setUser({ email: "" });
  };

  // Signup function
  const Signup = (details) => {
    console.log(details);
    // Check if email is already registered

    // Create db entry
  }

  // SwitchPage function
  const SwitchPage = () => {
    setIsLogin(!isLogin);
    console.log("LOGIN: " + isLogin);
  }

  // If logged in display welcome, if not display correct form
  return (
    <div className="App">
      {user.email != "" ? (
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
