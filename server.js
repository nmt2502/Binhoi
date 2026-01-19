const express = require("express");
require("./worker"); // chạy ngầm

const app = express();
const PORT = process.env.PORT || 3000;

// ROOT
app.get("/", (req, res) => {
  res.send("Bot đang chạy ngầm OK");
});

// PING cho UptimeRobot
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log("Server online port", PORT);
});
