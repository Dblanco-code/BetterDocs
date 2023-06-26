import React from "react";
import "../../Css/note.css"; // Import the CSS file

const Note = () => {
  return (
    <div className="container">
      <h2>Notes</h2>
      <div>
        <div>
          <textarea placeholder="Content"></textarea>
        </div>
        <button>Submit</button>
      </div>
    </div>
  );
};

export default Note;
