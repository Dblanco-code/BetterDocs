import './App.css';
import Parse from 'parse';
import Components from "./Components/Components.js";
import * as Env from './environments';

// Parse Initialization
Parse.serverURL = Env.SERVER_URL;
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);

export default function App() {
  return <Components />;
}
