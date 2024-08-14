import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FlavorList.css';

const FlavorList = ({ searchQuery }) => {
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/flavors')
            .then(response => response.json())
            .then(data => setFlavors(data))
            .catch(error => console.error("Error fetching flavors:", error));
    }, []);

    const filteredFlavors = flavors.filter(flavor =>
        flavor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderTableRows = () => {
        const rows = [];
        for (let i = 0; i < filteredFlavors.length; i += 3) {
            rows.push(
                <tr key={i}>
                    <td>
                        {filteredFlavors[i] && (
                            <div className="flavor-item">
                                <Link to={`/flavors/${filteredFlavors[i].id}`}>
                                    <img src={filteredFlavors[i].image} alt={filteredFlavors[i].name} />
                                    <h3>{filteredFlavors[i].name}</h3>
                                    <p>{filteredFlavors[i].description}</p>
                                </Link>
                            </div>
                        )}
                    </td>
                    <td>
                        {filteredFlavors[i + 1] && (
                            <div className="flavor-item">
                                <Link to={`/flavors/${filteredFlavors[i + 1].id}`}>
                                    <img src={filteredFlavors[i + 1].image} alt={filteredFlavors[i + 1].name} />
                                    <h3>{filteredFlavors[i + 1].name}</h3>
                                    <p>{filteredFlavors[i + 1].description}</p>
                                </Link>
                            </div>
                        )}
                    </td>
                    <td>
                        {filteredFlavors[i + 2] && (
                            <div className="flavor-item">
                                <Link to={`/flavors/${filteredFlavors[i + 2].id}`}>
                                    <img src={filteredFlavors[i + 2].image} alt={filteredFlavors[i + 2].name} />
                                    <h3>{filteredFlavors[i + 2].name}</h3>
                                    <p>{filteredFlavors[i + 2].description}</p>
                                </Link>
                            </div>
                        )}
                    </td>
                </tr>
            );
        }
        return rows;
    };

    return (
        <div className="flavor-list">
            <table>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

export default FlavorList;