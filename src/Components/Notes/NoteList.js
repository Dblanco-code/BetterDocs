import React from 'react';
import '../../Css/noteList.css'; // Import the CSS file

const NoteList = ({ notes }) => {
  return (
    <div className="note-list-container">
      <h2>Your Notes:</h2>
      <div className="note-list">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <h3 className="note-title">{note.get('Title')}</h3>
            <p className="note-content">{note.get('Content')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
