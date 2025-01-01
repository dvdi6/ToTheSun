import { NavLink, Link } from 'react-router-dom'
import Logo from '../Logo.jsx'
import './NavBar.css'

export default function NavBar() {
    return (
        <nav className="navbar-container" role="navigation" aria-label="Main navigation">
            <Link to="/" aria-label="Navigate to Home">
                <Logo />
            </Link>
            <div className="nav-links" role="menu" aria-label="Navigation links">
                <NavLink 
                    to="/destinations" 
                    aria-label="View available destinations"
                    role="menuitem"
                >
                    Destinations
                </NavLink>
                <NavLink 
                    to="/about" 
                    aria-label="Learn about us"
                    role="menuitem"
                >
                    About
                </NavLink>
                <NavLink 
                    to="/contact" 
                    aria-label="Contact us"
                    role="menuitem"
                >
                    Contact
                </NavLink>
            </div>
        </nav>
    )
}