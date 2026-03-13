const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "u801158482_kings",
    password: "G^cHXs@v6",
    database: "u801158482_kings"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
    } else {
        console.log("MySQL Connected");
    }
});

app.post('/webhook', async (req, res) => {

    const receivedData = req.body;

    const sql = "INSERT INTO webhook_logs (source, data) VALUES (?, ?)";

    db.query(sql, ["webhook", JSON.stringify(receivedData)], (err, result) => {

        if (err) {
            console.log("Insert error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        console.log("Inserted ID:", result.insertId);

        res.json({
            message: "Data received and stored successfully",
            id: result.insertId
        });

    });

});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});