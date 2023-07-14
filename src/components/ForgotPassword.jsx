import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmitEmail = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("https://keeperapp-backend.onrender.com/user/ForgotPassword", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setSuccessMessage("An OTP has been sent to your email address.");
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

  const handleSubmitOtp = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("https://keeperapp-backend.onrender.com/user/Verifyotp", {
      method: "POST",
      body: JSON.stringify({ email, otp }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setSuccessMessage("OTP verified. Please enter your new password.");
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

  const handleSubmitNewPassword = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("https://keeperapp-backend.onrender.com/user/ChangePassword", {
      method: "POST",
      body: JSON.stringify({ email, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setSuccessMessage(
            "Password changed successfully. Please login with your new password."
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
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
    <div className="forgot-password-container">
      <h1>Forgot Password</h1>
      {error && <div>{error}</div>}
      {successMessage && <div>{successMessage}</div>}
      {!successMessage && (
        <form className="forgot-password-form" onSubmit={handleSubmitEmail}>
          <label htmlFor="email">Enter your email address:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      )}
      {successMessage && successMessage.includes("OTP") && (
        <form className="otp-form" onSubmit={handleSubmitOtp}>
          <label htmlFor="otp">Enter the OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={otp}
            onChange={handleOtpChange}
            required
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      )}
      {successMessage && successMessage.includes("new password") && (
        <form className="newPassword-form" onSubmit={handleSubmitNewPassword}>
          <label htmlFor="newPassword">Enter a new password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
export default ForgotPassword;
