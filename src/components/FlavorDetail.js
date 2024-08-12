import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const FlavorDetail = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [flavor, setFlavor] = useState(null); // State to store the flavor data
    const [loading, setLoading] = useState(true); // State to manage the loading status
    const [error, setError] = useState(null); // State to manage any error that occurs

    useEffect(() => {
        fetch(`http://localhost:3000/flavors/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFlavor(data); // Set the flavor data
                setLoading(false); // Set loading to false
            })
            .catch(error => {
                console.error('Error fetching the flavor:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>; // Display a loading message while fetching
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Display an error message if an error occurs
    }

    if (!flavor) {
        return <div>No flavor found.</div>; // Display a message if the flavor is not found
    }

    return (
        <div className="flavor-detail">
            <img src={flavor.image} alt={flavor.name} />
            <h2>{flavor.name}</h2>
            <p>{flavor.description}</p>
            <p>Price: ${flavor.price.toFixed(2)}</p>
            <h3>Reviews</h3>
            <ul>
                {flavor.reviews.map(review => (
                    <li key={review.id}>
                        <strong>{review.author}</strong>: {review.comment} (Rating: {review.rating}/5)
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlavorDetail;
