import React, { useEffect, useState } from "react";
import { checkUser, createUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import "../../Css/authRegister.css";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
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
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        if (userCreated) {
          alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );
          navigate("/");
        }
        setAdd(false);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (event) => {
    event.preventDefault();
    const { name, value: newValue } = event.target;

    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: newValue
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setAdd(true);
  };

  return (
    <div className="auth-register-container">
      <h2>Register</h2>
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
    </div>
  );
};

export default AuthRegister;
