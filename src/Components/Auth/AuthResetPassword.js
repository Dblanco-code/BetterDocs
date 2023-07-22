import React, { useState } from "react";
import { resetPassword } from "../../Common/Services/AuthService";
import { useNavigate } from "react-router-dom";
import "../../Css/authRegister.css";

/* This component returns the password reset page. */

const AuthRegister = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetting, setResetting] = useState(false);

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setResetting(true);

    resetPassword(email, newPassword)
      .then(() => {
        navigate("/");
        setResetting(false);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        setResetting(false);
      });
  };

  return (
    <div className="auth-register-container">
      <h2>Reset Password</h2>
      <form onSubmit={onSubmitHandler}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={onChangeNewPassword}
          required
        />
        <button type="submit" disabled={resetting}>
          {resetting ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default AuthRegister;
