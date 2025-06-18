const socket = io();
let currentRoom = "";

const showMsg = document.getElementById("showMsg");
const sendBtn = document.getElementById("sendBtn");
const joinBtn = document.getElementById("joinBtn");

sendBtn.addEventListener("click", () => {
  const msgInput = document.getElementById("msg");
  const username = document.getElementById("username").value.trim();
  const msg = msgInput.value.trim();

  if (!currentRoom) {
    alert("Please join a room first");
    return;
  }

  if (!username) {
    alert("Please enter your username");
    return;
  }

  if (msg) {
    socket.emit("send-msg", { msg, room: currentRoom, username });
    msgInput.value = "";
  }
});

joinBtn.addEventListener("click", () => {
  const room = document.getElementById("room").value.trim();
  if (room) {
    socket.emit("join-room", room);
  }
});

socket.on("room-joined", (room) => {
  currentRoom = room;
  document.getElementById("roomInfo").textContent = `Current Room: ${room}`;
  const li = document.createElement("p");
  li.innerHTML = `<strong>Joined room:</strong>  ${room}`;
  li.classList.add("join-p");
  showMsg.appendChild(li);
});

socket.on("receive-msg", ({ username, msg }) => {
  const li = document.createElement("li");
  li.textContent = `${username}: ${msg}`;
  showMsg.appendChild(li);
  showMsg.scrollTop = showMsg.scrollHeight;
});
