const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "u801158482_kings",
    password: "G^cHXs@v6",
    database: "u801158482_kings"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }
    console.log("MySQL Connected");
});

// Webhook endpoint
app.post('/webhook', async (req, res) => {

    const receivedData = req.body;

    try {

        // Store JSON in database
        const sql = "INSERT INTO webhook_logs (source, data) VALUES (?, ?)";

        db.query(sql, [
            "webhook",
            JSON.stringify(receivedData)
        ]);

        // Optional: Forward to another API
        // await axios.post("https://example.com/api", receivedData);

        res.json({
            message: "Data received and stored successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});