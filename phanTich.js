function phanTichChuoi(chuoi) {
  if (chuoi.length < 6) {
    return {
      ket_luan: "CHỜ",
      ly_do: "Chuỗi quá ngắn",
    };
  }

  let maxBet = 1;
  let cur = 1;
  let dao = 0;

  for (let i = 1; i < chuoi.length; i++) {
    if (chuoi[i] === chuoi[i - 1]) {
      cur++;
      maxBet = Math.max(maxBet, cur);
    } else {
      dao++;
      cur = 1;
    }
  }

  if (maxBet >= 4) {
    return {
      ket_luan: "THEO DÀI",
      ly_do: `Bệt ${maxBet} phiên`,
    };
  }

  if (dao >= chuoi.length - 3) {
    return {
      ket_luan: "THEO NGẮN",
      ly_do: "Đảo liên tục",
    };
  }

  return {
    ket_luan: "BẺ",
    ly_do: "Chuỗi loạn",
  };
}

module.exports = phanTichChuoi;
