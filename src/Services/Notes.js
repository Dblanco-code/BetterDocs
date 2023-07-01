import Parse from 'parse';
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new note with title and content
export const createNote = (title, content) => {
  console.log("Creating note with title: ", title);
  const Note = Parse.Object.extend("Note");
  const note = new Note();
  // using setter to UPDATE the object
  note.set("Title", title);
  note.set("Content", content)
  return note.save().then((result) => {
    // returns new Note object
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

// DELETE operation - remove note by ID
export const removeNote = (id) => {
  const Note = Parse.Object.extend("Note");
  const query = new Parse.Query(Note);
  return query.get(id).then((note) => {
    note.destroy();
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