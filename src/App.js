import './App.css';
import React from 'react';
import Components from "./Components/Components.js";
import * as Env from './environments';
import Parse from 'parse';
import algoliasearch from 'algoliasearch/lite';

// Algolia Initialization
const algoliaClient = algoliasearch(Env.ALGOLIA_APPLICATION_ID, Env.ALGOLIA_ADMIN_API_KEY);
const noteIndex = algoliaClient.initIndex(Env.ALGOLIA_INDEX_NAME);

// Parse Initialization
Parse.serverURL = Env.PARSE_SERVER_URL;
Parse.initialize(Env.PARSE_APPLICATION_ID, Env.PARSE_JAVASCRIPT_KEY);

export default function App() {
  return <Components />;
}
