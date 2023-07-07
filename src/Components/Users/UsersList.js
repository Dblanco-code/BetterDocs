import React from 'react';
import '../../CSS/usersList.css'; // Import the CSS file

const UsersList = ({ users }) => {
  return (
    <div className="user-list-container">
      <h2>User List:</h2>
      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <div>
              <span>
                {/* Using getter for User Object to display username */}
                <li key={user.id}><strong>{user.get("username")}</strong></li>{" "}
              </span>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;