import './App.css';
import React from 'react';
import Components from "./Components/Components.js";
import * as Env from './environments';
import Parse from 'parse';

// Parse Initialization
Parse.serverURL = Env.SERVER_URL;
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);

export default function App() {
  return <Components />;
}
