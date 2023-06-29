import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import NotesList from './NotesList';
import getNote from "../../Services/Notes"

const Notes = () => {
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
};

export default Notes;

