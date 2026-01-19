const layKetQua = require("./fetchData");
const { docChuoi, ghiChuoi } = require("./store");
const phanTich = require("./phanTich");
const guiTelegram = require("./telegram");

let lastSend = new Set();

function tachCau(chuoi10) {
  let result = [];
  let temp = chuoi10[0];
  let count = 1;

  for (let i = 1; i < chuoi10.length; i++) {
    if (chuoi10[i] === chuoi10[i - 1]) {
      temp += chuoi10[i];
      count++;
    } else {
      result.push(temp);
      temp = chuoi10[i];
      count = 1;
    }
  }
  result.push(temp);
  return result;
}

async function worker() {
  const kq = await layKetQua();
  if (!kq) return;

  let chuoi = docChuoi() || "";

  // tránh trùng phiên
  if (chuoi.slice(-1) === kq) return;

  chuoi += kq;
  ghiChuoi(chuoi);

  if (chuoi.length < 10) return;

  const chuoi10 = chuoi.slice(-10);
  const cacCau = tachCau(chuoi10);

  for (const cau of cacCau) {
    if (cau.length < 2) continue; // bỏ cầu quá ngắn

    const pt = phanTich(cau);
    const cauType = `${cau.length}-${cau.length}`;
    const thuatToan = `${cau} → ${pt.ket_luan}`;
    const key = cau + pt.ket_luan;

    // tránh spam trùng
    if (lastSend.has(key)) continue;
    lastSend.add(key);

    const msg =
`🎮 *Game:* Sunwin

🔢 *Chuỗi:* ${cau}
📐 *Cầu:* ${cauType}

📊 *Phân tích:* ${pt.ket_luan}
📝 *Lý do:* ${pt.ly_do}

🧠 *Thuật toán:*
\`${thuatToan}\`
`;

    await guiTelegram(msg);
  }
}

setInterval(worker, 5000);
