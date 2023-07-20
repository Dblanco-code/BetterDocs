import React from 'react';
import { useOthers } from "./liveblocks.config";

function Room() {
    const others = useOthers();
    const userCount = others.length;
    return <div>There are {userCount} other user(s) online</div>;
  }
  
export default Room;
  
