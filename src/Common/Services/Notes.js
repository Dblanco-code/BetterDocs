import Parse from 'parse';
/* SERVICE FOR PARSE SERVER OPERATIONS */

import * as Env from "../../environments";
import algoliasearch from 'algoliasearch';

// Algolia Initialization
const algoliaClient = algoliasearch(Env.ALGOLIA_APPLICATION_ID, Env.ALGOLIA_ADMIN_API_KEY);
const noteIndex = algoliaClient.initIndex(Env.ALGOLIA_INDEX_NAME);

// // CREATE operation - new note with title and content
// export const createNote = (title, content) => {
//   console.log("Creating note with title: ", title);
//   const Note = Parse.Object.extend("Note");
//   const note = new Note();
//   // using setter to UPDATE the object
//   note.set("Title", title);
//   note.set("Content", content)
//   return note.save().then((result) => {
//     // returns new Note object
//     return result;
//   });
// };

// Modify createNote to also save to Algolia
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
      objectID: result.id, // Algolia uses objectID as a unique identifier
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

// READ operation - get all notes in Parse class Note
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

// // DELETE operation - remove note by ID
// export const removeNote = (id) => {
//   const Note = Parse.Object.extend("Note");
//   const query = new Parse.Query(Note);
//   return query.get(id).then((note) => {
//     note.destroy();
//   });
// };

// Modify removeNote to also delete from Algolia
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

/* //READ operation - get info about note from Parse class Note
const getNote = async() => {
    const Note = Parse.Object.extend('Note');
    const query = new Parse.Query(Note);
    // You can also query by using a parameter of an object
    // query.equalTo('objectId', 'xKue915KBG');
    try {
      const results = await query.find();
      console.log('Users found:', results);
      return results;
      }
    catch (error) {
      console.error('Error while fetching Note', error);
    }
} */