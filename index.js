const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join-room", (room) => {
    socket.join(room);
    socket.emit("room-joined", room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("send-msg", ({ msg, room, username }) => {
    io.to(room).emit("receive-msg", { msg, username });
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
