import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setError(null);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError(null);
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          // Response is successful, so we can extract the necessary data from it
          response.json().then((data) => {
            const user_id = data.id;
            navigate("/userNotes", { state: { user_id } });
          });
        } else {
          // Response is not successful, so we can extract the error message from it
          response.json().then((data) => {
            console.log(data.message);
            setEmail("");
            setPassword("");
            setError(data.message);
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        setEmail("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label htmlFor="password">Password:</label>
        {/* <div className="password-wrapper"> */}
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {/* <span className="visibility-icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </span> */}
        {/* </div> */}
        <button type="submit" disabled={loading}>
          Login
        </button>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p>
          Forgot your password? <a href="/forgot-password">Reset it</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
