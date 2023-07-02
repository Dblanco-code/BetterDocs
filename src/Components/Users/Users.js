import React, { useState, useEffect } from 'react';

import {createUser, getAllUsers, removeUser} from "../../Services/Users"
import UsersList from './UsersList';

const Users = () => {
  // Variables in the state to hold data
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getAllUsers().then((users) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState('');
  
  useEffect(() => {
    // Check for add flag and make sure title and content state variables are defined
    if (username && email && password && add) {
      createUser(username, email, password).then((newUser) => {
        setAdd(false);
        // Add the newly created user to the users array
        // to render the new list of notes (thru spread/concatination)
        setUsers([...users, newUser]);
        setSuccessMessage('User successfully created!');
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old notes list to take out selected note
      const newUsers = users.filter((user) => user.id !== remove);
      setUsers(newUsers);

      removeUser(remove).then(() => {
        console.log("Removed user with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [username, email, password, users, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (event) => {
    event.preventDefault();
    // Trigger add flag to create note and
    // re-render list with new note
    setAdd(true);
  };

    // Handler to track changes to the username input text
    const onUsernameChangeHandler = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      // Continuously updating username to be added on submit
      setUsername(event.target.value);
    };

    // Handler to track changes to the email input text
    const onEmailChangeHandler = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      // Continuously updating email to be added on submit
      setEmail(event.target.value);
    };

    // Handler to track changes to the password input text
    const onPasswordChangeHandler = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      // Continuously updating password to be added on submit
      setPassword(event.target.value);
    };

    return (
      <section>
        <div className="container">
          <h2>Create a User</h2>
          <div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={onUsernameChangeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={onEmailChangeHandler}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={onPasswordChangeHandler}
              />
            </div>
            <button type="submit" onClick={onClickHandler}>Create User!</button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <UsersList users={users} />
      </section>
    );
}

export default Users;
