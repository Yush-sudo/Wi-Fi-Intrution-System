const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 10000; // Make sure Render assigns the correct port

const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true }); // ✅ Fix: noServer mode

// ✅ Handle HTTP requests (Prevents "Upgrade Required" error)
app.get("/", (req, res) => {
    res.send("✅ WebSocket Server is Running! Use WebSockets to connect.");
});

// ✅ Handle WebSocket Upgrade Correctly (Fixes the crash issue)
server.on("upgrade", (req, socket, head) => {
    if (req.url === "/") {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        });
    } else {
        socket.destroy();
    }
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

// ✅ Start Server on the Correct Port
server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
