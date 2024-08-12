import React, { useState } from 'react';

const OrderForm = ({ onAddOrder }) => {
    const [selectedFlavors, setSelectedFlavors] = useState([]);
    const [container, setContainer] = useState('Cup');
    const [toppings, setToppings] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const order = {
            flavors: selectedFlavors,
            container,
            toppings,
            totalPrice: calculateTotalPrice(),
            date: new Date().toISOString().split('T')[0],
        };
        onAddOrder(order);
    };

    const calculateTotalPrice = () => {
        // Calculate total price based on selected flavors and toppings
        return selectedFlavors.length * 3.5 + toppings.length * 0.5; // Example calculation
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Customize Your Order</h2>
            {/* You can add flavor selection, container selection, and toppings input fields here */}
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
