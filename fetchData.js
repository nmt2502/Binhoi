const axios = require("axios");

const API_GOC = "https://sunwinsaygex-pcl2.onrender.com/api/sun";

async function layKetQua() {
  try {
    const res = await axios.get(API_GOC, { timeout: 5000 });
    const data = res.data;

    if (!data || !data.ket_qua) return null;

    const kq = data.ket_qua.toLowerCase();
    if (kq.includes("t")) return "T";
    if (kq.includes("x")) return "X";

    return null;
  } catch {
    return null;
  }
}

module.exports = layKetQua;
