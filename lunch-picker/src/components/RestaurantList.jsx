// client/src/components/RestaurantList.js
import React from 'react';
import '../App.css'; // Import global styles

const RestaurantList = ({ restaurants, deleteRestaurant }) => {
    return (
        <div style={{ marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '10px', verticalAlign: 'middle' }}>#</th>
                        <th style={{ padding: '10px', verticalAlign: 'middle' }}>Restaurant</th>
                        <th style={{ padding: '10px', verticalAlign: 'middle' }}>Menu Link</th>
                        <th style={{ padding: '10px', verticalAlign: 'middle' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map((restaurant, index) => (
                        <tr key={restaurant.id} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '10px', verticalAlign: 'middle' }}>{index + 1}</td>
                            <td style={{ padding: '10px', verticalAlign: 'middle' }}>{restaurant.name}</td>
                            <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                                <a
                                    href={restaurant.menuLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#007BFF', textDecoration: 'none' }}
                                >
                                    View Menu
                                </a>
                            </td>
                            <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                                <button
                                    onClick={() => deleteRestaurant(restaurant.id)}
                                    style={{
                                        backgroundColor: '#ff8c8c',
                                        color: 'white',
                                        padding: '5px 10px',
                                        border: 'none',
                                        borderRadius: '3px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantList;