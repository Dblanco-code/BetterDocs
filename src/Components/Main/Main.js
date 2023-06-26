import React from "react";
import "../../Css/main.css"; // Import the CSS file
import UserList from "./UserList.js";
import Note from "./Note.js";
import StoredNotes from "./StoredNotes.js";

const Main = () => {
  return (
    <div className="container">
      <h1>Better Docs</h1>
      Google Docs, but better!
      <UserList />
      <Note />
      <StoredNotes />
    </div>
  );
};

export default Main;
