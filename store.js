const fs = require("fs");
const FILE = "./data.json";

function docDuLieu() {
  if (!fs.existsSync(FILE)) {
    return { chuoi: "", phien_cuoi: null };
  }
  return JSON.parse(fs.readFileSync(FILE));
}

function ghiDuLieu(data) {
  fs.writeFileSync(FILE, JSON.stringify(data));
}

module.exports = { docDuLieu, ghiDuLieu };
