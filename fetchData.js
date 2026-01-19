const axios = require("axios");
const API_URL = "https://sunwinsaygex-pcl2.onrender.com/api/sun";

module.exports = async function layKetQua() {
  try {
    const res = await axios.get(API_URL);
    const { ket_qua, phien } = res.data;

    if (!ket_qua || !phien) return null;

    return {
      phien,
      kq: ket_qua === "Tài" ? "T" : "X"
    };
  } catch {
    return null;
  }
};
