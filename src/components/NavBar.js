import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'; // Assuming you'll add some custom styles

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="scoop.jpg" alt="Serenity Scoops Logo" />
                <span className="navbar-title">Serenity Scoops</span>
            </div>
            <div className="navbar-links">
                <NavLink to="/flavors" className={({ isActive }) => isActive ? "active" : ""}>Explore Flavors</NavLink>
                <NavLink to="/order-history" className={({ isActive }) => isActive ? "active" : ""}>Order History</NavLink>
                <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin Panel</NavLink>
            </div>
        </nav>
    );
};

export default NavBar;
