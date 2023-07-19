import { Link } from "react-router-dom";
import { checkUser, logoutUser } from "../../Common/Services/AuthService";
import "../../CSS/footer.css";

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
            <Link to="/users" className="footer-menu-link">
              Users
            </Link>
          </li>
          <li className="footer-menu-item">
            {!isAuthenticated && (
              <Link to="/auth/login" className="footer-menu-link">
                Login
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
