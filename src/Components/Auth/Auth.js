import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../../Common/Services/AuthService";
import "../../Css/authmodel.css";

const AuthModule = () => {
    const navigate = useNavigate();

    // redirect already authenticated users back to home
    useEffect(() => {
        if (checkUser()) {
            alert("You are already logged in");
            navigate("/");
        }
    }, [navigate]);

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
