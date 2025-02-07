import React, { useState } from 'react';

const RandomizeButton = ({ restaurants }) => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const randomizeRestaurant = () => {
        if (restaurants.length === 0) {
            alert('No restaurants available to pick from!');
            return;
        }
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        setSelectedRestaurant(restaurants[randomIndex]);
    };

    const closePopup = () => {
        setSelectedRestaurant(null);
    };

    return (
        <div>
            <button
                onClick={randomizeRestaurant}
                style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                }}
            >
                Pick a Random Restaurant
            </button>

            {selectedRestaurant && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            padding: '20px',
                            maxWidth: '400px',
                            width: '90%',
                            textAlign: 'center',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <h2>{selectedRestaurant.name}</h2>
                        <p>
                            <a
                                href={selectedRestaurant.menuLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#007bff', textDecoration: 'none' }}
                            >
                                View Menu
                            </a>
                        </p>
                        <button
                            onClick={closePopup}
                            style={{
                                backgroundColor: '#ff6347',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                marginTop: '10px',
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RandomizeButton;