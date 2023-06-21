import { Link } from "react-router-dom";
import "../styles/navigation_bar.css"

export default function NavigationBar() {
    return (

        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="logo-link">Spotify App</Link>
            </div>
            <ul className="navbar-items">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
            </ul>
        </nav>
    )
}