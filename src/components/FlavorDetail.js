import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './FlavorDetail.css';

const FlavorDetail = () => {
    // Get id from URL parameters
    const { id } = useParams(); 
    const [flavor, setFlavor] = useState(null);
    const [loading, setLoading] = useState(true);
    //error handling
    const [error, setError] = useState(null);
    //initialize quantity
    const [quantity, setQuantity] = useState(1);
    //navigate to other pages
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`http://localhost:3000/flavors/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFlavor(data);
                //set default quantity value to 1
                setQuantity(data.servings > 0 ? 1 : 0);
                setLoading(false);
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
    
        // calculate total price
        const pricePerUnit = parseFloat(flavor.price); 
        const totalPrice = (quantity * pricePerUnit).toFixed(2);
    
        const order = {
            // Generate a unique id for the order
            id: Date.now(),
            flavor: flavor.name,
            image: flavor.image,
            quantity: quantity,
            price: totalPrice,
            date: new Date().toLocaleString(),
        };
    
        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
    
        // Update the flavors
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!flavor) {
        return <div>No flavor found.</div>;
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