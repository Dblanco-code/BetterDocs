// index.js

const Parse = require('parse/node');
const algoliasearch = require('algoliasearch');
const Env = require('../src/environments');

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // You can use another port if this is in use

// Enable all CORS requests
app.use(cors());

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

// // Run the indexing function
// indexNotesToAlgolia().then(() => {
//   console.log('Successfully indexed notes to Algolia.');
// }).catch(error => {
//   console.error('Failed to index notes to Algolia:', error);
// });

// Set up endpoint
app.get('/reindex', async (req, res) => {
  try {
    await indexNotesToAlgolia();
    res.status(200).send('Reindexing complete.');
  } catch (err) {
    res.status(500).send('Error during reindexing.');
    console.error(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});