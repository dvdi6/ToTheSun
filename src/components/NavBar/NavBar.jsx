import { NavLink, Link } from 'react-router-dom'
import Logo from '../Logo.jsx'
import "./NavBar.css"

export default function NavBar() {

    return (
        <div className='navbar-container'>
            <Link to="/"><Logo /></Link>
            <div className='nav-links'>
                <NavLink to="/destinations">Destinations</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>
        </div>

    )
}