const layKetQua = require("./fetchData");
const { docChuoi, ghiChuoi } = require("./store");
const phanTich = require("./phanTich");
const guiTelegram = require("./telegram");

let lastSend = "";

async function worker() {
  const kq = await layKetQua();
  if (!kq) return;

  let chuoi = docChuoi();

  // tránh trùng phiên
  if (chuoi.slice(-1) === kq) return;

  chuoi += kq;
  ghiChuoi(chuoi);

  // đủ 10 ký tự mới phân tích
  if (chuoi.length < 10) return;

  const pt = phanTich(chuoi);
  const thuatToan = `${chuoi} → ${pt.ket_luan}`;

  // tránh gửi lặp
  if (lastSend === thuatToan) return;
  lastSend = thuatToan;

  const msg =
`🎮 *SUNWIN*

Chuỗi:
${chuoi}

📊 Phân tích:
${pt.ket_luan}
(${pt.ly_do})

🧠 Thuật toán:
\`${thuatToan}\`
`;

  await guiTelegram(msg);
}

setInterval(worker, 5000);
