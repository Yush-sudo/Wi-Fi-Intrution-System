const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 10000;
const app = express();
const server = http.createServer(app); // Create HTTP server

// ✅ Attach WebSocket server to the HTTP server
const wss = new WebSocket.Server({ noServer: true });

server.on("upgrade", (request, socket, head) => {
    console.log("📡 WebSocket Upgrade Request Received");
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    });
});

app.get("/", (req, res) => {
    res.send("✅ WebSocket Server is Running! Use WebSockets to connect.");
});

// ✅ WebSocket Server Logic
wss.on("connection", (ws) => {
    console.log("✅ New WebSocket client connected!");

    ws.on("message", (message) => {
        console.log(`📩 Received: ${message}`);
    });

    ws.on("close", () => {
        console.log("❌ WebSocket client disconnected");
    });

    // Simulate sales updates every 5 seconds
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

// ✅ Start the Server
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
