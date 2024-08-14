//navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src="scoop.jpg" alt="Serenity Scoops Logo" />
                <span className="navbar-title">Serenity Scoops</span>
            </div>
            <div className="navbar-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>HomePage</NavLink>
                <NavLink to="/flavors" className={({ isActive }) => isActive ? "active" : ""}>Explore Flavors</NavLink>
                <NavLink to="/order-history" className={({ isActive }) => isActive ? "active" : ""}>Order History</NavLink>
                <NavLink to="/admin" className={({ isActive }) => isActive ? "active" : ""}>Admin Panel</NavLink>
            </div>
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search Flavors..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button onClick={() => onSearch(searchQuery)}>Search</button>
            </div>
        </nav>
    );
};

export default NavBar;