import React from "react";
import { Link } from "react-router-dom";
import "../../Css/authmodel.css";

/* This component handles the routing for authentication. */

const AuthModule = () => {
    return (
        <div className="auth-module">
            <li>
              <Link to="/auth/register" >
                  Register
              </Link>
            </li>
            <li>
              <Link to="/auth/login" >
                  Login
              </Link>
            </li>
            <li>
              <Link to="/auth/reset-password" >
                  Reset Password
              </Link>
            </li>

        </div>
    );
}

export default AuthModule;
