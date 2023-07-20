import Parse from 'parse';

export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  console.log("User: ", user);
  return user
    .signUp()
    .then((newUserSaved) => {
      return newUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.email);

  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.email, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const logoutUser = () => {
  Parse.User.logOut()
    .then(() => {
      // Redirect to the home page
      window.location.href = "/";
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};

export const resetPassword = (email, newPassword) => {
  return Parse.User.requestPasswordReset(email)
    .then(() => {
      // Update the user's password in the back4app database
      const query = new Parse.Query(Parse.User);
      query.equalTo("email", email);

      return query.first()
        .then((user) => {
          user.setPassword(newPassword);
          return user.save();
        })
        .then(() => {
          alert("Password has been updated successfully.");
        })
        .catch((error) => {
          alert(`Error updating password: ${error.message}`);
        });
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
};


export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};
