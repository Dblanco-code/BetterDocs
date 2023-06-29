import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import UserList from './UserList';
import getUsers from "../../Services/Users";

const Users = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const UserObject = Parse.Object.extend('User');
    const newUser = new UserObject();
    newUser.set('username', username);
    newUser.set('email', email);
    newUser.set('password', password);

    try {
      await newUser.save();
      console.log('User created:', newUser);
      setUsername('');
      setEmail('');
      setPassword('');
      setSuccessMessage('User successfully created!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error while creating User:', error);
      setSuccessMessage('');
      setErrorMessage('Error while creating User. Please try again.');
    }
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

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
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div>
        <UserList users={users} />
      </div>
    </section>
  );
};

export default Users;
