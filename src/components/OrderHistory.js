import React, { useState, useEffect } from 'react';
import './OrderHistory.css'; 

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        //Retrieve orders from the localStorage
        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(storedOrders);
    }, []);

    const handleDelete = (id) => {
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    return (
        <div className="order-history-container">
            <h2>Order History</h2>
            {orders.length === 0 ? (
                <p>No orders have been made yet.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Flavor</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>
                                    <img 
                                        src={order.image} 
                                        alt={order.flavor} 
                                        style={{ width: '100px', height: 'auto' }} 
                                    />
                                </td>
                                <td>{order.flavor}</td>
                                <td>{order.quantity}</td>
                                <td>${(order.quantity * order.price).toFixed(2)}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(order.id)} 
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderHistory;
