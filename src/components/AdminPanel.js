import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    const [flavors, setFlavors] = useState([]);
    const [editingFlavor, setEditingFlavor] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        toppings: ''
    });

    useEffect(() => {
        fetchFlavors();
    }, []);

    const fetchFlavors = () => {
        fetch('http://localhost:3000/flavors')
            .then(response => response.json())
            .then(data => setFlavors(data))
            .catch(error => console.error("Error fetching flavors:", error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/flavors/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setFlavors(flavors.filter(flavor => flavor.id !== id));
        })
        .catch(error => console.error("Error deleting flavor:", error));
    };

    const handleEdit = (flavor) => {
        setEditingFlavor(flavor);
        setFormData({
            name: flavor.name,
            description: flavor.description,
            price: flavor.price,
            image: flavor.image,
            category: flavor.category,
            toppings: flavor.toppings.join(', ')
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        const updatedFlavor = {
            ...editingFlavor,
            ...formData,
            toppings: formData.toppings.split(',').map(topping => topping.trim())
        };

        fetch(`http://localhost:3000/flavors/${editingFlavor.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFlavor)
        })
        .then(() => {
            setFlavors(flavors.map(flavor => flavor.id === editingFlavor.id ? updatedFlavor : flavor));
            setEditingFlavor(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                image: '',
                category: '',
                toppings: ''
            });
        })
        .catch(error => console.error("Error updating flavor:", error));
    };

    return (
        <div className="admin-panel">
            <h2>Manage Flavors</h2>
            {editingFlavor && (
                <div className="edit-form">
                    <h3>Edit Flavor</h3>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                    />
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                    />
                    <label>Toppings (comma separated):</label>
                    <input
                        type="text"
                        name="toppings"
                        value={formData.toppings}
                        onChange={handleInputChange}
                    />
                    <button className="save-btn" onClick={handleSave}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingFlavor(null)}>Cancel</button>
                </div>
            )}
            <table className="flavor-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flavors.map(flavor => (
                        <tr key={flavor.id}>
                            <td>{flavor.name}</td>
                            <td>{flavor.description}</td>
                            <td>${flavor.price}</td>
                            <td>{flavor.category}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(flavor)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(flavor.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;

