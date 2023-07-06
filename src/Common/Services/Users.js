import Parse from 'parse';
/* SERVICE FOR PARSE SERVER OPERATIONS */

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

/* //READ operation - get info about user from Parse class User
const getUser = async() => {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
    // You can also query by using a parameter of an object
    // query.equalTo('objectId', 'xKue915KBG');
    try {
      const results = await query.find();
      console.log('Users found:', results);
      return results;
      }
    catch (error) {
      console.error('Error while fetching User', error);
    }
} */