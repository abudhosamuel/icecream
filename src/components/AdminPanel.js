import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    const [flavors, setFlavors] = useState([]);
    const [editingFlavor, setEditingFlavor] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        servings: ''
    });

    useEffect(() => {
        fetchFlavors();
    }, []);

    const fetchFlavors = () => {
        fetch('http://localhost:3001/flavors')
            .then(response => response.json())
            .then(data => setFlavors(data))
            .catch(error => console.error("Error fetching flavors:", error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3001/flavors/${id}`, {
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
            id: flavor.id,
            name: flavor.name,
            description: flavor.description,
            price: flavor.price,
            image: flavor.image,
            category: flavor.category,
            servings: flavor.servings
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        if (editingFlavor) {
            //Updates an existing flavor
            const updatedFlavor = {
                ...editingFlavor,
                ...formData
            };

            fetch(`http://localhost:3001/flavors/${editingFlavor.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFlavor)
            })
            .then(() => {
                setFlavors(flavors.map(flavor => flavor.id === editingFlavor.id ? updatedFlavor : flavor));
                setEditingFlavor(null);
                resetForm();
            })
            .catch(error => console.error("Error updating flavor:", error));
        } else {
            //Adds a new flavor
            const newFlavor = {
                ...formData,
                id: Date.now() //Use to timestamp as an unique ID
            };

            fetch('http://localhost:3001/flavors', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newFlavor)
            })
            .then(() => {
                setFlavors([...flavors, newFlavor]);
                resetForm();
            })
            .catch(error => console.error("Error adding flavor:", error));
        }
    };

    const resetForm = () => {
        setFormData({
            id: '',
            name: '',
            description: '',
            price: '',
            image: '',
            category: '',
            servings: ''
        });
    };

    return (
        <div className="admin-panel">
            <h2>Manage Flavors</h2>
            <div className="edit-form">
                <h3>{editingFlavor ? 'Edit Flavor' : 'Add New Flavor'}</h3>
                <label>ID:</label>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    disabled={editingFlavor !== null} //Disable ID input when editing
                />
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
                <label>Servings:</label>
                <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                />
                <button className="save-btn" onClick={handleSave}>
                    {editingFlavor ? 'Save Changes' : 'Add Flavor'}
                </button>
                {editingFlavor && (
                    <button className="cancel-btn" onClick={() => setEditingFlavor(null)}>
                        Cancel
                    </button>
                )}
            </div>
            <table className="flavor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Servings</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {flavors.map(flavor => (
                        <tr key={flavor.id}>
                            <td>{flavor.id}</td>
                            <td>{flavor.name}</td>
                            <td>{flavor.description}</td>
                            <td>${flavor.price}</td>
                            <td>{flavor.category}</td>
                            <td>{flavor.servings}</td>
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
