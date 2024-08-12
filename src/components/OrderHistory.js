import React, { useState, useEffect } from 'react';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(data => setOrders(data));
    }, []);

    return (
        <div className="order-history">
            <h2>Your Order History</h2>
            {orders.map(order => (
                <div key={order.id} className="order-item">
                    <p>Date: {order.date}</p>
                    <p>Flavors: {order.flavors.join(', ')}</p>
                    <p>Container: {order.container}</p>
                    <p>Toppings: {order.toppings.join(', ')}</p>
                    <p>Total Price: ${order.totalPrice}</p>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
