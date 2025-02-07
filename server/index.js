// server/index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Path to the JSON file for storage
const dataFilePath = path.join(__dirname, 'restaurants.json');

// Load or initialize restaurants data
let restaurants = [];
if (fs.existsSync(dataFilePath)) {
    restaurants = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
} else {
    fs.writeFileSync(dataFilePath, JSON.stringify(restaurants));
}

// Get all restaurants
app.get('/restaurants', (req, res) => {
    res.json(restaurants);
});

// Add a new restaurant
app.post('/restaurants', (req, res) => {
    const { name, menuLink } = req.body;
    if (!name || !menuLink) {
        return res.status(400).json({ message: 'Name and menu link are required' });
    }
    const newRestaurant = { id: Date.now(), name, menuLink };
    restaurants.push(newRestaurant);
    fs.writeFileSync(dataFilePath, JSON.stringify(restaurants));
    res.status(201).json(newRestaurant);
});

// Delete a restaurant by ID
app.delete('/restaurants/:id', (req, res) => {
    const { id } = req.params;
    restaurants = restaurants.filter(r => r.id !== parseInt(id));
    fs.writeFileSync(dataFilePath, JSON.stringify(restaurants));
    res.status(200).json({ message: 'Restaurant deleted' });
});

const votes = {};

app.post('/reset-votes', (req, res) => {
    // Clear the votes object
    Object.keys(votes).forEach(key => delete votes[key]);

    // Reset the votes count for all restaurants
    restaurants = restaurants.map(restaurant => ({ ...restaurant, votes: 0 }));

    fs.writeFileSync(dataFilePath, JSON.stringify(restaurants)); // Save changes to the file

    res.status(200).json({ message: 'Votes reset successfully.' });
});

app.post('/vote/:restaurantId', (req, res) => {
    const ip = req.ip; // Get the IP address
    const { restaurantId } = req.params;

    // Check if the IP has already voted
    if (votes[ip]) {
        return res.status(403).json({ success: false, message: 'You have already voted.' });
    }

    // Register the vote
    votes[ip] = restaurantId;

    // Increment the restaurant's vote count
    const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
    if (restaurant) {
        restaurant.votes = (restaurant.votes || 0) + 1;
        return res.status(200).json({ success: true, message: 'Vote registered!' });
    }

    return res.status(404).json({ success: false, message: 'Restaurant not found.' });
});

app.get('/votes', (req, res) => {
    const sortedRestaurants = restaurants.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    res.json(sortedRestaurants);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});