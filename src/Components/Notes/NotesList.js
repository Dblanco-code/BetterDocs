import React from 'react';
import '../../Css/notesList.css'; // Import the CSS file

const NotesList = ({ notes }) => {
  return (
    <div className="note-list-container">
      <h2>Your Notes:</h2>
      {notes.length > 0 && (
        <ul>
          {notes.map((note) => (
            <div>
              <span>
                {/* Using getter for Note Object to display title and content */}
                <li key={note.id}><strong>Title: {note.get("Title")}</strong> | Content: {note.get("Title")}</li>{" "}
              </span>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesList;
