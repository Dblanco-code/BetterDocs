// index.js

const Parse = require('parse/node');
const algoliasearch = require('algoliasearch');
const Env = require('../src/environments');

// Initialize Parse
Parse.initialize(Env.PARSE_APPLICATION_ID, Env.PARSE_JAVASCRIPT_KEY); // replace with your actual keys
Parse.serverURL = Env.PARSE_SERVER_URL // replace with your server URL

// Initialize Algolia
const client = algoliasearch(Env.ALGOLIA_APPLICATION_ID, Env.ALGOLIA_ADMIN_API_KEY);
const index = client.initIndex('notes');

// Indexing function
const indexNotesToAlgolia = () => {
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
    index.saveObjects(algoliaData);
  });
};

// Run the indexing function
indexNotesToAlgolia().then(() => {
  console.log('Successfully indexed notes to Algolia.');
}).catch(error => {
  console.error('Failed to index notes to Algolia:', error);
});
