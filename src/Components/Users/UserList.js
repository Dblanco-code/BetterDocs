import React from 'react';
import '../../Css/usersList.css'; // Import the CSS file

const UserList = ({ users }) => {
  return (
    <div className="user-list-container">
      <h2>User List:</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user} className="user-item">
            <h3 className="user-name">{user.get('username')}</h3>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default UserList;






