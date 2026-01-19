const layKetQua = require("./fetchData");
const { docChuoi, ghiChuoi } = require("./store");
const phanTich = require("./phanTich");
const { tachChuoi } = require("./tachChuoi");
const guiTelegram = require("./telegram");

async function worker() {
  console.log("⏱ Worker tick");

  const kq = await layKetQua();
  console.log("📥 Kết quả API:", kq);
  if (!kq) return;

  let chuoi = docChuoi() || "";
  chuoi += kq;
  ghiChuoi(chuoi);

  console.log("🔢 Chuỗi hiện tại:", chuoi);

  if (chuoi.length < 3) return;

  const chuoi10 = chuoi.slice(-10);
  console.log("✂️ Chuỗi 10:", chuoi10);

  const cacCau = tachChuoi(chuoi10);
  console.log("📐 Các cầu:", cacCau);

  for (const c of cacCau) {
    if (c.length < 2) continue;

    const pt = phanTich(c);

    const msg =
`🎮 Game: Sunwin
🔢 Chuỗi: ${c}
📐 Cầu: ${c.length}-${c.length}

📊 Phân tích: ${pt.ket_luan}
📝 Lý do: ${pt.ly_do}

🧠 Thuật toán:
\`${c} → ${pt.ket_luan}\`
`;

    console.log("📤 Gửi Telegram:\n", msg);
    await guiTelegram(msg);
  }
}

setInterval(worker, 5000);
