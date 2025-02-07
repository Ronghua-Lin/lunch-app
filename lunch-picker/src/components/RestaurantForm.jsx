import React, { useState } from 'react';
import '../App.css'; // Import global styles

const RestaurantForm = ({ addRestaurant }) => {
    const [name, setName] = useState('');
    const [menuLink, setMenuLink] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const isValidUrl = (url) => {
        const urlPattern = new RegExp(
            '^(https?:\\/\\/)?' + // Protocol
                '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // Domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
                '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // Port and path
                '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // Query string
                '(\\#[-a-zA-Z\\d_]*)?$',
            'i'
        );
        return !!urlPattern.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !menuLink) {
            setErrorMessage('Please provide both name and menu link.');
            return;
        }

        if (!isValidUrl(menuLink)) {
            setErrorMessage('Please enter a valid URL.');
            return;
        }

        // Clear error and proceed with adding the restaurant
        setErrorMessage('');
        addRestaurant({ name, menuLink });
        setName('');
        setMenuLink('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                background: 'white',
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ marginBottom: '15px' }}>
                <label>
                    <strong>Restaurant Name:</strong>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="E.g., Pizza Palace"
                    />
                </label>
            </div>
            <div style={{ marginBottom: '15px' }}>
                <label>
                    <strong>Menu Link:</strong>
                    <input
                        type="text"
                        value={menuLink}
                        onChange={(e) => setMenuLink(e.target.value)}
                        placeholder="E.g., http://menu.com"
                    />
                </label>
            </div>
            {errorMessage && (
                <p style={{ color: 'red', fontSize: '0.9rem', marginBottom: '15px' }}>
                    {errorMessage}
                </p>
            )}
            <button
                type="submit"
                style={{ backgroundColor: '#ff6363', color: 'white' }}
            >
                Add Restaurant
            </button>
        </form>
    );
};

export default RestaurantForm;