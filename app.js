const backendURL = "https://wi-fi-intrution-system.onrender.com"; // Change this to your actual backend URL

function connectWebSocket() {
    const socket = new WebSocket(backendURL);

    socket.onopen = () => console.log("✅ WebSocket Connected");

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "salesUpdate") {
            document.getElementById("daily-sales").innerText = message.data.daily || 'N/A';
            document.getElementById("weekly-sales").innerText = message.data.weekly || 'N/A';
            document.getElementById("monthly-sales").innerText = message.data.monthly || 'N/A';
        }
    };

    socket.onclose = () => {
        console.warn("❌ WebSocket Disconnected. Reconnecting...");
        setTimeout(connectWebSocket, 3000); // Retry in 3 seconds
    };
}

connectWebSocket();
