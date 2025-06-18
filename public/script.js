const socket = io();
let currentRoom = "";

const showMsg = document.getElementById("showMsg");
const sendBtn = document.getElementById("sendBtn");
const joinBtn = document.getElementById("joinBtn");
const userBtn = document.getElementById("userBtn");

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

userBtn.addEventListener("click", () => {
  username.readOnly = true;
  userBtn.style.display = "none";
  if (!username) {
    alert("Please enter a username");
    return;
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

  const p = document.createElement("p");
  p.innerHTML = `<strong>Joined room:</strong> ${room}`;
  p.classList.add("join-p");
  showMsg.appendChild(p);
  showMsg.scrollTop = showMsg.scrollHeight;
});




socket.on("receive-msg", ({ username, msg }) => {
  const p = document.createElement("p");
  p.innerHTML = `<span class="username-p">${username}:</span> ${msg}`;
  showMsg.appendChild(p);
  showMsg.scrollTop = showMsg.scrollHeight;
});


const instructionBtn = document.getElementById("instructionBtn");
const instructionBox = document.getElementById("instructionBox");

instructionBtn.addEventListener("click", () => {
  if (instructionBox.style.display === "none") {
    instructionBox.style.display = "block";
    instructionBtn.innerHTML = "Hide Instructions";
  } else {
    instructionBox.style.display = "none";
  }
});
