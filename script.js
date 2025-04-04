
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTUgK_XkG2WZFj5IvYZebEAICElFmJCl0",
  authDomain: "rschat-3cf87.firebaseapp.com",
  databaseURL: "https://rschat-3cf87-default-rtdb.asia-southeast1.firebasedatabase.app", // ✅ Correct region
  projectId: "rschat-3cf87",
  storageBucket: "rschat-3cf87.firebasestorage.app",
  messagingSenderId: "846904503738",
  appId: "1:846904503738:web:ebe3a2cb6d79de7f3f8183",
  measurementId: "G-PF4KETJTYZ"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, "messages");

const users = {
  "snehujaan": "raajujaan",
  "raajujaan": "snehujaan"
};

window.login = function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (users[username] && users[username] === password) {
    document.getElementById("login-screen").style.display = "none";
    document.getElementById("chat-screen").style.display = "block";
    window.currentUser = username;
    document.querySelector(".username").textContent = `${password} ✨❤️`;
  } else {
    document.getElementById("login-error").style.display = "block";
  }
};

window.sendMessage = function () {
  const input = document.getElementById("messageInput");
  const text = input.value.trim();
  if (text && window.currentUser) {
    push(messagesRef, {
      text,
      user: window.currentUser,
      timestamp: Date.now()
    });
    input.value = "";
  }
};

onChildAdded(messagesRef, (data) => {
  const { text, user } = data.val();
  const messageDiv = document.createElement("div");
  messageDiv.className = "bubble " + (user === window.currentUser ? "sender" : "receiver");
  messageDiv.textContent = `${user}: ${text}`;
  document.getElementById("messages").appendChild(messageDiv);
});
