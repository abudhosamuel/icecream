import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [flavors, setFlavors] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        fetch('http://localhost:3001/flavors')
            .then(response => response.json())
            .then(data => setFlavors(data))
            .catch(error => console.error("Error fetching flavors:", error));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % flavors.length);
        }, 3000); //Change slide every 3 seconds
        return () => clearInterval(interval);
    }, [flavors]);

    if (flavors.length === 0) return <p>Loading flavors...</p>;

    return (
        <div className="home-page">
            <div className="welcome-text">
                <h1>Welcome to Serenity Scoops</h1>
                <p>Where you get to experience heaven as there are a variety of ice cream flavors for all our customers.</p>
            </div>
            <div className="slideshow-container">
                {flavors.map((flavor, index) => (
                    <div
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        key={flavor.id}
                    >
                        <img src={flavor.image} alt={flavor.name} />
                        <div className="slide-caption">
                            <h2>{flavor.name}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="explore-flavors">
                <Link to="/flavors" className="explore-button">Explore Flavors</Link>
            </div>

            <div className="about-us">
                <h2>About Us</h2>
                <p>At Serenity Scoops, we believe that every scoop of ice cream should be a moment of pure bliss. Our mission is to bring you the most delightful and indulgent flavors crafted from the finest ingredients. Whether you're a fan of classic favorites or adventurous new tastes, we have something for everyone. Step into our world of creamy goodness and let each spoonful transport you to a place of serenity and joy.</p>
            </div>
        </div>
    );
};

export default HomePage;
