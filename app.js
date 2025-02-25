const socket = new WebSocket("wss://wi-fi-intrution-system.onrender.com");

socket.onopen = () => {
    console.log("✅ WebSocket Connected!");
    document.getElementById("status").textContent = "🟢 Connected";
};

socket.onmessage = (event) => {
    console.log("📩 Message from server:", event.data);
    try {
        const message = JSON.parse(event.data);

        if (message.type === "salesUpdate") {
            document.getElementById("daily-sales").textContent = `₱${message.data.daily}`;
            document.getElementById("weekly-sales").textContent = `₱${message.data.weekly}`;
            document.getElementById("monthly-sales").textContent = `₱${message.data.monthly}`;
        }

        if (message.type === "intrusionAlert") {
            document.getElementById("alert-notification").style.display = "block";
        }
    } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
    }
};

socket.onclose = () => {
    console.warn("❌ WebSocket Disconnected! Retrying...");
    document.getElementById("status").textContent = "🔴 Disconnected. Reconnecting...";
    setTimeout(() => {
        location.reload(); // Refresh page to reconnect
    }, 5000);
};

socket.onerror = (error) => {
    console.error("❌ WebSocket Error:", error);
};

// Disable alarm button event
document.getElementById("disable-alarm").addEventListener("click", () => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: "disableAlarm" }));
        document.getElementById("alert-notification").style.display = "none";
    } else {
        console.error("🚨 WebSocket not connected. Cannot send disableAlarm.");
    }
});
