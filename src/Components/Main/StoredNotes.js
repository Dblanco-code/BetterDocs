import React from "react";
import "../../Css/storedNotes.css"; 

const StoredNotes = ({ data, onChildClick }) => {
  return (
    <div className="container">
      <h2>Note Drive</h2>
      <div>
        <div>
          <p>This is where you will see all the notes you have access to</p>
        </div>
        <div>
          <input type="text" placeholder="Search" />
        </div>
        <div>
          <h3>My Notes</h3>
          <ul>
            <li>Note 1</li>
            <li>Note 2</li>
            <li>Note 3</li>
          </ul>
        </div>
        <div>
          <h3>Shared Notes</h3>
          <ul>
            <li>Shared Note 1</li>
            <li>Shared Note 2</li>
            <li>Shared Note 3</li>
          </ul>
        </div>
        <button onClick={onChildClick}>{data}</button>
      </div>
    </div>
  );
};

export default StoredNotes;
