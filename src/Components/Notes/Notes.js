import React, { useState, useEffect } from 'react';
import Parse from 'parse';

import {createNote, getAllNotes, removeNote} from "../../Services/Notes"
import NotesList from './NotesList';

/* const Notes = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async () => {
    const NoteObject = Parse.Object.extend('Note');
    const newNote = new NoteObject();
    newNote.set('Title', title);
    newNote.set('Content', content);

    try {
      await newNote.save();
      console.log('Note created:', newNote);
      setTitle('');
      setContent('');
      setSuccessMessage('Note successfully created!');
      setErrorMessage('');
    } catch (error) {
      console.error('Error while creating Note:', error);
      setSuccessMessage('');
      setErrorMessage('Error while creating Note. Please try again.');
    }
  };

  const [note, setNote] = useState([]);

  useEffect(() => {
    getNote().then((note) => {
      setNote(note);
    });
  }, []);

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
              onChange={handleTitleChange}
            />
          </div>
          <div>
            <textarea
              placeholder="Content"
              value={content}
              onChange={handleContentChange}
            ></textarea>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div>
        <NotesList notes={note} />
      </div>
    </section>
  );
}; */

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
        setLessons([...notes, newNote]);
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

    // Handler to track changes to the title input text
    const onContentChangeHandler = (event) => {
      event.preventDefault();
      console.log(event.target.value);
      // Continuously updating title to be added on submit
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
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <textarea
                placeholder="Content"
                value={content}
                onChange={handleContentChange}
              ></textarea>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      </section>
    );
}

export default Notes;
