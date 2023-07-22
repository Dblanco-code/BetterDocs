import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import "../../Css/authlogin.css";

/* This component returns the login page. */

const AuthLogin = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: ""
  });
  const [add, setAdd] = useState(false);

  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );
          navigate("/");
        }
        setAdd(false);
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (event) => {
    event.preventDefault();
    const { name, value: newValue } = event.target;

    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: newValue
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setAdd(true);
  };

  return (
    <div className="auth-login-container">
      <h2>Login</h2>
      <AuthForm
        user={currentUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <div className="reset-password-link">
        <a href="/auth/reset-password">Forgot your password? Reset it here</a>
      </div>
    </div>
  );
};

export default AuthLogin;
