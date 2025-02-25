function connectWebSocket() {
    const socket = new WebSocket("ws://" + window.location.host);

    socket.onopen = () => console.log("✅ WebSocket Connected");

    socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "salesUpdate") {
            document.getElementById("daily-sales").innerText = message.data.daily || 'N/A';
            document.getElementById("weekly-sales").innerText = message.data.weekly || 'N/A';
            document.getElementById("monthly-sales").innerText = message.data.monthly || 'N/A';
        }
        if (message.type === "intrusionAlert") {
            if (message.data.alert) {
                document.getElementById("alert-notification").style.display = "block";
                playAlarm();
            } else {
                document.getElementById("alert-notification").style.display = "none";
            }
        }
    };

    socket.onclose = () => {
        console.warn("❌ WebSocket Disconnected. Reconnecting...");
        setTimeout(connectWebSocket, 3000); // Retry in 3 seconds
    };
}

connectWebSocket();

document.getElementById("disable-alarm").addEventListener("click", () => {
    fetch("/disable-alarm.php", { method: "POST" })
        .then(response => response.json())
        .then(() => document.getElementById("alert-notification").style.display = "none")
        .catch(error => console.error("Error disabling alarm:", error));
});

function playAlarm() {
    const audio = new Audio('alarm.mp3');
    document.body.addEventListener("click", () => {
        audio.play();
    }, { once: true }); // Ensures it plays only once after user interaction

    if (navigator.vibrate) {
        navigator.vibrate([500, 300, 500]); // Vibrates for 500ms, pauses 300ms, then vibrates again
    }
}
