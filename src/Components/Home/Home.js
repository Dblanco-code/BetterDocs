import React, { useState, useEffect } from 'react';
import "../../Css/home.css";
import NotesList from "../Notes/NotesList.js";
import Notes from "../Notes/Notes.js";
import getNote from "../../Services/Notes"
import Footer from '../Footer/Footer';

const Main = () => {
  const [note, setNote] = useState([]);

  useEffect(() => {
    getNote().then((note) => {
      setNote(note);
    });
  }, []);

  return (
    <section>
      <div className="container">
        <h1>Better Docs</h1>
        <p>Google Docs, but better!</p>
        {/* <Notes />
        <NotesList notes={note} /> */}
      </div>
    </section>
  );
};

export default Main;
