import { useState } from "react";

function LoginForm({ Login, ChangePage, error }) {
  // Login details
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  // Pass details to our login function upon submit event
  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };

  const switchForm = (e) => {
    e.preventDefault();

    ChangePage("signup");
  };

  // Email/username and password fields update state of details
  return (
    <form onSubmit={submitHandler}>
      <div className="form-inner">
        <h2>Sign In</h2>
        {error != "" ? <div className="error">{error}</div> : ""}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <input type="submit" value="SIGN IN" />
        <hr className="seperator" />
        <div className="form-redirect">
          <button onClick={switchForm}>No account yet? Create one here</button>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
