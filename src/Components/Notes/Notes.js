import React, { useState, useEffect } from 'react';

import {createNote, getAllNotes, removeNote} from "../../Services/Notes"
import NotesList from './NotesList';

const Notes = () => {
  // Variables in the state to hold data
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getAllNotes().then((notes) => {
      console.log(notes);
      setNotes(notes);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState('');
  
  useEffect(() => {
    // Check for add flag and make sure title and content state variables are defined
    if (title && content && add) {
      createNote(title, content).then((newNote) => {
        setAdd(false);
        // Add the newly created note to the notes array
        // to render the new list of notes (thru spread/concatination)
        setNotes([...notes, newNote]);
        setSuccessMessage('Note successfully created!');
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old notes list to take out selected note
      const newNotes = notes.filter((note) => note.id !== remove);
      setNotes(newNotes);

      removeNote(remove).then(() => {
        console.log("Removed note with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [title, content, notes, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (event) => {
    event.preventDefault();
    // Trigger add flag to create note and
    // re-render list with new note
    setAdd(true);
  };

    // Handler to track changes to the title input text
    const onTitleChangeHandler = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      // Continuously updating title to be added on submit
      setTitle(event.target.value);
    };

    // Handler to track changes to the content input text
    const onContentChangeHandler = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      // Continuously updating content to be added on submit
      setContent(event.target.value);
    };

    return (
      <section>
        <div className="container">
          <h2>Make a Note</h2>
          <div>
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={onTitleChangeHandler}
              />
            </div>
            <div>
              <textarea
                placeholder="Content"
                value={content}
                onChange={onContentChangeHandler}
              ></textarea>
            </div>
            <button type="submit" onClick={onClickHandler}>Create Note!</button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <NotesList notes={notes} />
      </section>
    );
}

export default Notes;
