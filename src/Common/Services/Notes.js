/* SERVICE FOR ALGOLIA AND PARSE SERVER OPERATIONS ON NOTE CLASS */

import Parse from 'parse';
import * as Env from "../../environments";
import algoliasearch from 'algoliasearch';

// Algolia Initialization
const algoliaClient = algoliasearch(Env.ALGOLIA_APPLICATION_ID, Env.ALGOLIA_ADMIN_API_KEY);
const noteIndex = algoliaClient.initIndex(Env.ALGOLIA_INDEX_NAME);

// CREATE operation - creates note and saves its info to Parse and Algolia
export const createNote = (title, content) => {
  console.log("Creating note with title: ", title);
  const Note = Parse.Object.extend("Note");
  const note = new Note();
  // using setter to UPDATE the object
  note.set("Title", title);
  note.set("Content", content)
  return note.save().then((result) => {
    // Save the new Note to Algolia as well
    noteIndex.saveObjects([{
      objectID: result.id, // Make Algolia ID the same as Parse ID
      title,
      content,
    }]);
    return result;
  });
};

// READ operation - get all notes in Parse class Note
export const getAllNotes = () => {
  const Note = Parse.Object.extend("Note");
  const query = new Parse.Query(Note);
  return query.find().then((results) => {
    // returns array of Note objects
    return results;
  });
};

// UPDATE operation - get all notes in Parse class Note and update Algolia
export const indexNotesToAlgolia = () => {
  const Note = Parse.Object.extend("Note");
  const query = new Parse.Query(Note);
  return query.find().then((results) => {
    // Prepare the data for Algolia
    const algoliaData = results.map(note => ({
      objectID: note.id,
      title: note.get('Title'),
      content: note.get('Content'),
    }));

    // Save the data to Algolia
    noteIndex.saveObjects(algoliaData);
  });
};

// DELETE operation - deletes note from Parse and Algolia
export const removeNote = (id) => {
  const Note = Parse.Object.extend("Note");
  const query = new Parse.Query(Note);
  return query.get(id).then((note) => {
    note.destroy().then(() => {
      // Delete the note from Algolia as well
      noteIndex.deleteObject(id);
    });
  });
};

// Search notes
export const searchNotes = (query) => {
  return noteIndex.search(query).then(({ hits }) => {
    // hits is an array of matches
    return hits;
  });
};