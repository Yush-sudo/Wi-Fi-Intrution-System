const socket = new WebSocket("wss://wi-fi-intrution-system.onrender.com");

socket.onopen = () => {
    console.log("✅ WebSocket connected!");
};

socket.onmessage = (event) => {
    console.log("📩 Received data:", event.data);
    
    const salesData = JSON.parse(event.data);

    // Update the dashboard UI
    document.getElementById("daily-sales").innerText = `₱${salesData.data.daily}`;
    document.getElementById("weekly-sales").innerText = `₱${salesData.data.weekly}`;
    document.getElementById("monthly-sales").innerText = `₱${salesData.data.monthly}`;
};

socket.onerror = (error) => {
    console.error("❌ WebSocket Error:", error);
};

socket.onclose = () => {
    console.warn("⚠️ WebSocket Disconnected. Reconnecting...");
    setTimeout(() => {
        location.reload();
    }, 5000);
};
const socket = new WebSocket("wss://wi-fi-intrution-system.onrender.com");

socket.onopen = () => {
    console.log("✅ WebSocket connected!");
};

socket.onmessage = (event) => {
    console.log("📩 Message from server:", event.data);
    try {
        const data = JSON.parse(event.data);
        if (data.type === "salesUpdate") {
            document.getElementById("daily-sales").textContent = `₱${data.data.daily}`;
            document.getElementById("weekly-sales").textContent = `₱${data.data.weekly}`;
            document.getElementById("monthly-sales").textContent = `₱${data.data.monthly}`;
        }
    } catch (error) {
        console.error("❌ Error parsing WebSocket message:", error);
    }
};

socket.onclose = () => {
    console.log("❌ WebSocket disconnected! Reconnecting...");
    setTimeout(() => location.reload(), 5000); // Auto-reconnect
};

socket.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
};
