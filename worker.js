const layKetQua = require("./fetchData");
const { docChuoi, ghiChuoi } = require("./store");
const phanTich = require("./phanTich");
const { tachChuoi } = require("./tachChuoi");
const guiTelegram = require("./telegram");

let sent = new Set();

async function worker() {
  const kq = await layKetQua();
  if (!kq) return;

  let chuoi = docChuoi();
  if (chuoi.slice(-1) === kq) return;

  chuoi += kq;
  ghiChuoi(chuoi);

  if (chuoi.length < 10) return;

  const chuoi10 = chuoi.slice(-10);
  const cacCau = tachChuoi(chuoi10);

  for (const c of cacCau) {
    if (c.length < 2) continue;

    const pt = phanTich(c);
    const key = c + pt.ket_luan;
    if (sent.has(key)) continue;
    sent.add(key);

    const msg =
`🎮 Game: Sunwin
🔢 Chuỗi: ${c}
📐 Cầu: ${c.length}-${c.length}

📊 Phân tích: ${pt.ket_luan}
📝 Lý do: ${pt.ly_do}

🧠 Thuật toán:
\`${c} → ${pt.ket_luan}\`
`;

    await guiTelegram(msg);
  }
}

setInterval(worker, 5000);
