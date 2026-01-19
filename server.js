const express = require("express");
const { docChuoi } = require("./store");
const phanTich = require("./phanTich");
require("./worker");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot đang chạy ngầm OK");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// ✅ CHECK CHUỖI
app.get("/check/chuoi", (req, res) => {
  const chuoi = docChuoi() || "";
  const pt = phanTich(chuoi);

  res.json({
    game: "sunwin",
    chuoi,
    do_dai: chuoi.length,
    ket_luan: pt.ket_luan,
    ly_do: pt.ly_do,
    thuat_toan: `${chuoi} → ${pt.ket_luan}`
  });
});

app.listen(PORT, () => {
  console.log("Server online port", PORT);
});
