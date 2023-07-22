import { Link } from "react-router-dom";
import { checkUser, logoutUser } from "../../Common/Services/AuthService";
import "../../Css/footer.css";

/*  This is the footer component, which acts as navigation for the website.  */

const Footer = () => {
  const isAuthenticated = checkUser();

  const handleSignOut = () => {
    logoutUser();
  };

  return (
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
            <Link to="/collab" className="footer-menu-link">
              Collab
            </Link>
          </li>
          <li className="footer-menu-item">
            <Link to="/users" className="footer-menu-link">
              Users
            </Link>
          </li>
          <li className="footer-menu-item">
            {!isAuthenticated && (
              <Link to="/auth/" className="footer-menu-link">
                Authentication
              </Link>
            )}
            {isAuthenticated && (
              <button className="footer-menu-link" onClick={handleSignOut}>
                Sign Out
              </button>
            )}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
