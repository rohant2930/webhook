const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Example endpoint to receive data
app.post('/webhook', (req, res) => {
    const receivedData = req.body;
    console.log('Received Data:', receivedData);

    // Send a response back
    res.json({
        message: 'Data received successfully!',
        data: receivedData
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});