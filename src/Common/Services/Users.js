/* SERVICE FOR PARSE SERVER OPERATIONS ON USER CLASS */

import Parse from 'parse';

// CREATE operation - new user with username, email, and password
export const createUser = (username, email, password) => {
  console.log("Creating user with username: ", username);
  const User = Parse.Object.extend("User");
  const user = new User();
  // using setter to UPDATE the object
  user.set("username", username);
  user.set("email", email)
  user.set("password", password)
  return user.save().then((result) => {
    // returns new User object
    return result;
  });
};

// READ operation - get all users in Parse class User
export const getAllUsers = () => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.find().then((results) => {
    // returns array of User objects
    return results;
  });
};

// DELETE operation - remove user by ID
export const removeUser = (id) => {
  const User = Parse.Object.extend("User");
  const query = new Parse.Query(User);
  return query.get(id).then((user) => {
    user.destroy();
  });
};