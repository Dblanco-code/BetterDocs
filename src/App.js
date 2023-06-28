import './App.css';
import Parse from 'parse';
import Components from "./Components/Components.js";

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
// Remember to inform BOTH the Back4App Application ID AND the JavaScript KEY
Parse.initialize(
  'Zn47snmNlv9Zl0z7WWTj3y4HFY8HOLZtWitrp1Kh', // This is your Application ID
  'Z8t1mr8aho1j8MjgVUo3HuN56CGaQshdFad2z48b' // This is your Javascript key
);

export default function App() {
  return <Components />;
}
