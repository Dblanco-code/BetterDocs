import React from 'react';
import '../../Css/notesList.css'; // Import the CSS file

const NotesList = ({ notes, handleRemove }) => {
  // Function to handle the download button click for a note
  const handleDownload = (title, content) => {
    // Create a Blob with the note's content
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a URL from the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.txt`; // Set the filename for the download
    link.click();

    // Clean up the URL object after the download
    URL.revokeObjectURL(url);
  };

  return (
    <div className="notes-list-container">
      <div className="notes-list-list-container">
        <h2>Notes List:</h2>
      </div>
      <ul className="notes-list">
        {notes.length > 0 && notes.map((note) => (
          <li key={note.id} className="note-item">
            <div className="note-content">
              <p className="note-title">{note.get("Title")}</p>
              <p className="note-description">{note.get("Content")}</p>
            </div>
            <button
              className="download-button"
              onClick={() => handleDownload(note.get("Title"), note.get("Content"))}
            >
              Download
            </button>
            <button className="download-button"
                  onClick={() => handleRemove(note.id)}
                >
                  Remove Note
                </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
