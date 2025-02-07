const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3001;

// Middleware to parse JSON requests
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Additional routes
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});