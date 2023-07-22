import React, { useState, useEffect } from 'react';
import {createNote, getAllNotes, removeNote, searchNotes} from "../../Common/Services/Notes"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NotesList from './NotesList';
import * as Env from "../../environments";
import algoliasearch from 'algoliasearch';

// Initialize Algolia
const client = algoliasearch(Env.ALGOLIA_APPLICATION_ID, Env.ALGOLIA_ADMIN_API_KEY);
const noteIndex = client.initIndex(Env.ALGOLIA_INDEX_NAME);

const Notes = () => {
  // Variables in the state to hold data
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage] = useState('');

  // UseEffect to run when the page loads to obtain async data and render
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
      // Filter the old notes list to take out selected note
      const newNotes = notes.filter((note) => note.id !== remove);
      setNotes(newNotes);

      removeNote(remove).then(() => {
        console.log("Removed note with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [title, content, notes, add, remove]);

  const handleRemove = async (noteId) => {
    try {
      await removeNote(noteId);
      console.log("Removed note with ID: ", noteId);
      
      // Update the notes list by removing the note with the specified ID
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  
      // Remove from Algolia index
      const { objectID } = await noteIndex.deleteObject(noteId);
      console.log(`Note ${objectID} removed from Algolia index.`);
  
      // Reindex notes
      const response = await fetch('http://localhost:3001/reindex');
      if (!response.ok) throw new Error('Reindexing failed.');
      console.log('Reindexing complete.');

      // Re-run the search query
      handleSearch();
  
    } catch (error) {
      console.error('Error during note removal:', error);
    }
  };

  // Handler to handle event passed from child submit button
  const onClickHandler = (event) => {
    event.preventDefault();
  
    // Check if the title and content are empty
    if (!title.trim() || !content.trim()) {
      alert('Please fill in both title and content before creating a note.');
      return; // Return early to prevent further execution
    }
  
    // Trigger add flag to create note and re-render list with a new note
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
  const onContentChangeHandler = (value) => {
    console.log(value);
    setContent(value);
  };

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Fetch request to trigger reindexing
    fetch('http://localhost:3001/reindex', { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          console.log('Reindexing completed');
          // Perform search after reindexing
          return searchNotes(query);
        } else {
          throw new Error('Reindexing failed');
        }
      })
      .then((searchResults) => setResults(searchResults))
      .catch((error) => console.log('Error: ', error));
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
              {/* Render the Quill editor with the content state */}
              <ReactQuill
                theme="snow"
                value={content}
                onChange={onContentChangeHandler}
                placeholder="Content"
              />
            </div>
            <button type="submit" onClick={onClickHandler}>Create Note!</button>
          </div>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className='container'>
        <h2>Search Notes</h2>
        <div>
          <input value={query} onChange={e => setQuery(e.target.value)} />
          <button onClick={handleSearch}>Search</button>

          {results.map(note => (
            <div key={note.objectID}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
      <NotesList notes={notes} handleRemove={handleRemove} />
      </section>
    );
  };
  
  export default Notes;
  
  
  
  