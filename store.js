const fs = require("fs");
const FILE = "./chuoi.txt";

function docChuoi() {
  if (!fs.existsSync(FILE)) return "";
  return fs.readFileSync(FILE, "utf8");
}

function ghiChuoi(chuoi) {
  fs.writeFileSync(FILE, chuoi.slice(-100));
}

module.exports = { docChuoi, ghiChuoi };
