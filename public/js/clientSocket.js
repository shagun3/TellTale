var connected = false;

//var socket = io("http://localhost:3003")
var socketUrl = "https://the-tell-tale.herokuapp.com"; 
 
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") { 
    socketUrl = "http://localhost:3003";
}
 
var socket = io(socketUrl);




socket.emit("setup", userLoggedIn);

socket.on("connected", () => connected = true);
socket.on("message received", (newMessage) => messageReceived(newMessage));

socket.on("notification received", () => {
    $.get("/api/notifications/latest", (notificationData) => {
        showNotificationPopup(notificationData)
        refreshNotificationsBadge();
    })
})

function emitNotification(userId) {
    if(userId == userLoggedIn._id) return;

    socket.emit("notification received", userId);
}