import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
      <footer>
        <nav>  
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          </ul>
        </nav>
      </footer>
}

export default Footer;