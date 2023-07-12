import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    fetch("http://localhost:4000/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setSuccessMessage(
            <p>
              Account created successfully. Please <a href="/">click here</a> to
              continue.
            </p>
          );
          let count = 5;
          const countdown = setInterval(() => {
            if (count > 0) {
              setSuccessMessage(
                <p>
                  Account created successfully. Please{" "}
                  <a href="/">click here</a> to continue or you will be
                  redirected in {count}s.
                </p>
              );
              count--;
            } else {
              clearInterval(countdown);
              navigate("/");
            }
          }, 1000);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          response.json().then((data) => {
            setError(data.message);
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <div className="error">{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      {!successMessage && (
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
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
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          <button type="submit" disabled={loading}>
            Signup
          </button>
          <p>
            Already have an account? <a href="/">Login here.</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Signup;
