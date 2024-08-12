import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FlavorList.css'; // Assuming you'll add some custom styles

const FlavorList = () => {
    const [flavors, setFlavors] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/flavors')
            .then(response => response.json())
            .then(data => setFlavors(data))
            .catch(error => console.error("Error fetching flavors:", error));
    }, []);

    const renderTableRows = () => {
        const rows = [];
        for (let i = 0; i < flavors.length; i += 3) {
            rows.push(
                <tr key={i}>
                    <td>
                        {flavors[i] && (
                            <div className="flavor-item">
                                <Link to={`/flavors/${flavors[i].id}`}>
                                    <img src={flavors[i].image} alt={flavors[i].name} />
                                    <h3>{flavors[i].name}</h3>
                                    <p>{flavors[i].description}</p>
                                </Link>
                            </div>
                        )}
                    </td>
                    <td>
                        {flavors[i + 1] && (
                            <div className="flavor-item">
                                <Link to={`/flavors/${flavors[i + 1].id}`}>
                                    <img src={flavors[i + 1].image} alt={flavors[i + 1].name} />
                                    <h3>{flavors[i + 1].name}</h3>
                                    <p>{flavors[i + 1].description}</p>
                                </Link>
                            </div>
                        )}
                    </td>
                    <td>
                        {flavors[i + 2] && (
                            <div className="flavor-item">
                                <Link to={`/flavors/${flavors[i + 2].id}`}>
                                    <img src={flavors[i + 2].image} alt={flavors[i + 2].name} />
                                    <h3>{flavors[i + 2].name}</h3>
                                    <p>{flavors[i + 2].description}</p>
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
