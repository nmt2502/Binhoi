const axios = require("axios");

const API_URL = "https://sunwinsaygex-pcl2.onrender.com/api/sun";

module.exports = async function layKetQua() {
  try {
    const res = await axios.get(API_URL, { timeout: 5000 });

    const ketQua = res.data?.ket_qua;
    if (!ketQua) {
      console.log("❌ API không có ket_qua");
      return null;
    }

    if (ketQua === "Tài") return "T";
    if (ketQua === "Xỉu") return "X";

    console.log("❌ ket_qua lạ:", ketQua);
    return null;
  } catch (e) {
    console.log("❌ Lỗi gọi API:", e.message);
    return null;
  }
};
