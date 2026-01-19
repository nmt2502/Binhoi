const layKetQua = require("./fetchData");
const { docChuoi, ghiChuoi } = require("./store");
const phanTich = require("./phanTich");
const { tachChuoi } = require("./tachChuoi");
const guiTelegram = require("./telegram");

let lastKQ = null;              // ✅ chống cộng chuỗi khi reload
let sentCau = new Set();        // ✅ chống spam telegram

async function worker() {
  console.log("⏱ Worker tick");

  const kq = await layKetQua(); // kq = "T" hoặc "X"
  console.log("📥 Kết quả API:", kq);
  if (!kq) return;

  let chuoi = docChuoi() || "";

  // ✅ CHỐNG LOAD / RESTART BỊ CỘNG CHUỖI
  if (kq === lastKQ && chuoi.endsWith(kq)) {
    console.log("⏩ Kết quả cũ – bỏ qua");
    return;
  }

  lastKQ = kq;

  // ✅ CHỈ CỘNG KHI THỰC SỰ CÓ VÁN MỚI
  if (!chuoi.endsWith(kq)) {
    chuoi += kq;
    ghiChuoi(chuoi);
  }

  console.log("🔢 Chuỗi hiện tại:", chuoi);

  if (chuoi.length < 3) return;

  const chuoi10 = chuoi.slice(-10);
  console.log("✂️ Chuỗi 10:", chuoi10);

  const cacCau = tachChuoi(chuoi10);
  console.log("📐 Các cầu:", cacCau);

  for (const c of cacCau) {
    if (c.length < 2) continue;

    const pt = phanTich(c);
    const key = c + pt.ket_luan;

    // ✅ CHỐNG GỬI LẠI CẦU CŨ
    if (sentCau.has(key)) continue;
    sentCau.add(key);

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
