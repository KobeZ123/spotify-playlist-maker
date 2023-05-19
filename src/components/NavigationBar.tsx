import { Link } from "react-router-dom";
import "../styles/navigation_bar.css"

export default function NavigationBar() {
    return (

        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="logo-link">Logo</Link>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact</Link>
                </li>
            </ul>
        </nav>
    )
}