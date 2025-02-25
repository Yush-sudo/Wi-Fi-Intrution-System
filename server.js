const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 10000;
const app = express();
const server = http.createServer(app); // Create an HTTP server

// Create WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
    res.send("✅ WebSocket Server is Running! Use WebSockets to connect.");
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

wss.on("connection", (ws) => {
    console.log("✅ New WebSocket client connected!");

    ws.on("message", (message) => {
        console.log(`📩 Received: ${message}`);
    });

    ws.on("close", () => {
        console.log("❌ WebSocket client disconnected");
    });

    // Send sales updates every 5 seconds
    setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({
                type: "salesUpdate",
                data: {
                    daily: Math.floor(Math.random() * 1000),
                    weekly: Math.floor(Math.random() * 7000),
                    monthly: Math.floor(Math.random() * 30000)
                }
            }));
        }
    }, 5000);
});

wss.on("error", (err) => {
    console.error(`❌ WebSocket server error: ${err.message}`);
});
