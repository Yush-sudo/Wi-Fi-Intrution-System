const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: [process.env.ALLOWED_ORIGIN], // Use environment variable for security
    methods: ["GET", "POST"]
}));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Catch-all route for index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ WebSocket Setup
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`✅ New client connected from ${ip}`);

    ws.on("message", (message) => {
        console.log(`📩 Received: ${message}`);
    });

    ws.on("close", () => console.log(`❌ Client disconnected: ${ip}`));
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Content Security Policy
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", `default-src 'self'; connect-src 'self' ws://${process.env.ALLOWED_ORIGIN}`);
    next();
});
