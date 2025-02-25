const WebSocket = require("ws");

const PORT = 3000;
const wss = new WebSocket.Server({ port: PORT });

console.log(`✅ WebSocket server running on ws://localhost:${PORT}`);

wss.on("connection", (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log(`✅ New client connected from ${ip}`);

    ws.on("message", (message) => {
        console.log(`📩 Received: ${message}`);
    });

    ws.on("close", () => {
        console.log(`❌ Client disconnected: ${ip}`);
    });

    // ✅ Simulate sending sales updates every 5 seconds
    setInterval(() => {
        const salesData = {
            type: "salesUpdate",
            data: {
                daily: Math.floor(Math.random() * 1000),
                weekly: Math.floor(Math.random() * 7000),
                monthly: Math.floor(Math.random() * 30000)
            }
        };
        ws.send(JSON.stringify(salesData));
    }, 5000);
});
