import Parse from 'parse';

const getNote = async() => {
    const Note = Parse.Object.extend('Note');
    const query = new Parse.Query(Note);
    // You can also query by using a parameter of an object
    // query.equalTo('objectId', 'xKue915KBG');
    try {
      const results = await query.find();
      return results;
      }
    catch (error) {
      console.error('Error while fetching Note', error);
    }
}

export default getNote;