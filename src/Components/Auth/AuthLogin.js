import React, { useEffect, useState } from "react";
import { checkUser, loginUser } from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const AuthLogin = () => {
    const navigate = useNavigate();

    // redirect already authenticated users back to home
    const [currentUser, setCurrentUser] = useState({
        email: "",
        password: ""
    });

    // flags in the state to watch for add/remove updates
    const [add, setAdd] = useState(false);

    useEffect(() => {
        if (checkUser()) {
            alert("You are already logged in");
            navigate("/");
        }
    }, [navigate]);

    // useEffect that run when changes are made to the state variable flags
    useEffect(() => {
        if (currentUser && add) {
            loginUser(currentUser).then((userLoggedIn) => {
                if (userLoggedIn) {
                    alert(
                        `${userLoggedIn.get("firstName")}, you successfully logged in!`
                    );
                    navigate("/");
                }
                // TODO: redirect user to main app
                setAdd(false);
            });
        }
    }, [navigate, currentUser, add]);

    const onChangeHandler = (event) => {
        event.preventDefault();
        console.log(event.target);
        const { name, value: newValue } = event.target;
        console.log(newValue);
    
        setCurrentUser({
            ...currentUser,
            [name]: newValue
        });
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("submitted: ", event.target);
        setAdd(true);
    };

    return (
        <div>
          <AuthForm
            user={currentUser}
            isLogin={true}
            onChange={onChangeHandler}
            onSubmit={onSubmitHandler}
          />
        </div>
    );
};

export default AuthLogin;