import React from "react";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";
import "../../Css/protectedRoute.css";

/* This component makes sure unauthenticated users cannot visit protected routes. */

const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/auth");
  };
  if (checkUser()) {
    return <Component />;
  } else {
    return (
      <div className="unauthorized-container">
        <p>Unauthorized!</p>
        <button onClick={goBackHandler}>Go Back</button>
      </div>
    );
  }
};

export default ProtectedRoute;
