const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 10000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ✅ Handle WebSocket Upgrade Requests
server.on("upgrade", (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
    });
});

// ✅ WebSocket Connection Handling
wss.on("connection", (ws) => {
    console.log("✅ WebSocket Client Connected!");

    ws.on("message", (message) => {
        console.log(`📩 Received: ${message}`);
    });

    ws.on("close", () => {
        console.log("❌ Client Disconnected");
    });

    // ✅ Send sales updates every 5 seconds
    const sendSalesUpdate = () => {
        if (ws.readyState === WebSocket.OPEN) {
            const salesData = {
                type: "salesUpdate",
                data: {
                    daily: Math.floor(Math.random() * 1000),
                    weekly: Math.floor(Math.random() * 7000),
                    monthly: Math.floor(Math.random() * 30000)
                }
            };
            ws.send(JSON.stringify(salesData));
        }
    };

    const interval = setInterval(sendSalesUpdate, 5000);
    ws.on("close", () => clearInterval(interval));
});

// ✅ Handle HTTP Requests (Fix "Upgrade Required" Error)
app.get("/", (req, res) => {
    res.send("✅ WebSocket Server is Running! Use WebSockets to connect.");
});

// ✅ Start Server
server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
