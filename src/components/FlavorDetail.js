import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FlavorDetail.css'; // Import the CSS file

const FlavorDetail = () => {
    const { id } = useParams(); // Get the ID from the URL parameters
    const [flavor, setFlavor] = useState(null); // State to store the flavor data
    const [loading, setLoading] = useState(true); // State to manage the loading status
    const [error, setError] = useState(null); // State to manage any error that occurs
    const [quantity, setQuantity] = useState(1); // State to store the selected quantity
    const navigate = useNavigate(); // Hook to navigate programmatically

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
                setQuantity(data.servings > 0 ? 1 : 0); // Initialize quantity based on available servings
                setLoading(false); // Set loading to false
            })
            .catch(error => {
                console.error('Error fetching the flavor:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const handleMakeOrder = () => {
        if (quantity < 1 || quantity > flavor.servings) {
            alert(`Please select a valid quantity between 1 and ${flavor.servings}`);
            return;
        }
    
        // Parse the price to ensure it's a number and calculate the total price
        const pricePerUnit = parseFloat(flavor.price); 
        const totalPrice = (quantity * pricePerUnit).toFixed(2); // This should give you the correct total price
    
        const order = {
            id: Date.now(), // Unique ID for the order
            flavor: flavor.name,
            image: flavor.image, // Include the image in the order
            quantity: quantity,
            price: totalPrice, // Store the calculated total price
            date: new Date().toLocaleString(),
        };
    
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
    
        // Reduce the available servings in db.json (would require an API call in a real app)
        fetch(`http://localhost:3000/flavors/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                servings: flavor.servings - quantity
            })
        }).then(() => {
            // Redirect to order history page after making the order
            navigate('/order-history');
        }).catch(error => console.error('Error updating servings:', error));
    };
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
        <div className="flavor-detail-container">
            <div className="flavor-detail">
                <img src={flavor.image} alt={flavor.name} />
                <h2>{flavor.name}</h2>
                <p>{flavor.description}</p>
                <p>Price: ${flavor.price.toFixed(2)}</p>
                <p>Available Servings: {flavor.servings}</p>

                <h3>Reviews</h3>
                <ul>
                    {flavor.reviews.map(review => (
                        <li key={review.id}>
                            <strong>{review.author}</strong>: {review.comment} (Rating: {review.rating}/5)
                        </li>
                    ))}
                </ul>

                <div className="quantity-section">
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        min="1"
                        max={flavor.servings}
                    />
                </div>

                <button onClick={handleMakeOrder}>Make Order</button>
            </div>
        </div>
    );
};

export default FlavorDetail;