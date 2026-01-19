const express = require("express");
require("./worker"); // KÍCH HOẠT NGẦM

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot đang chạy ngầm...");
});

app.listen(PORT, () => {
  console.log("Server online");
});
