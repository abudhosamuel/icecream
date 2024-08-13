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

    // Calculate the total price of the order
    const calculateTotalPrice = () => {
        return selectedFlavors.length * 3.5 + toppings.length * 0.5;
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Customize Your Order</h2>
            <button type="submit">Place Order</button>
        </form>
    );
};

export default OrderForm;
