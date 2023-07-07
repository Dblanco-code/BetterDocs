import { Link } from "react-router-dom"; // Import async linker from react-router-dom
import "../../Css/footer.css"; // Import the CSS file for the footer

// This component returns the footer for the website. Key word: RETURN.

const Footer = () => (
  <footer className="footer-container">
    <nav className="footer-nav">
      <ul className="footer-menu">
        <li className="footer-menu-item">
          <Link to="/" className="footer-menu-link">
            Home
          </Link>
        </li>
        <li className="footer-menu-item">
          <Link to="/notes" className="footer-menu-link">
            Notes
          </Link>
        </li>
        <li className="footer-menu-item">
          <Link to="/users" className="footer-menu-link">
            Users
          </Link>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
