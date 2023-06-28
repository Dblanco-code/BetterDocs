import React, { useState, useEffect } from 'react';
import "../../Css/main.css";
import NoteList from "../Notes/NoteList.js";
import Note from "../Notes/Note.js";
import getNote from "../../Services/Notes"

const Main = () => {
  const [note, setNote] = useState([]);

  useEffect(() => {
    getNote().then((note) => {
      setNote(note);
    });
  }, []);

  return (
    <div className="container">
      <h1>Better Docs</h1>
      Google Docs, but better!
      <Note />
      <NoteList notes={note}/>
    </div>
  );
};

export default Main;
