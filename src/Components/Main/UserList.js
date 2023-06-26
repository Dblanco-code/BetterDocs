import React from "react";

// Leverages the Users.js hook to show users in a list
const UserList = () => {
  return (
    <div>
      <hr />
      Here are all the people who support our website!
      {/* <ul>
        {users.map((user) => (
          <li key={user}>
            {user.email} | {user.firstName} {user.lastName}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default UserList;
