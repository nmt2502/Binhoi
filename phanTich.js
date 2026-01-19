function phanTichChuoi(chuoi) {
  const arr = chuoi.split("");

  // đếm bệt cuối
  let betCuoi = 1;
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] === arr[i - 1]) betCuoi++;
    else break;
  }

  // đếm số lần đảo
  let dao = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) dao++;
  }

  let ket_luan = "";
  let ly_do = "";

  // RULE 1: bệt cuối dài
  if (betCuoi >= 3) {
    ket_luan = "THEO DÀI";
    ly_do = `Bệt cuối ${betCuoi}`;
  }

  // RULE 2: đảo nhiều
  else if (dao >= arr.length / 2) {
    ket_luan = "THEO NGẮN";
    ly_do = "Đảo nhịp liên tục";
  }

  // RULE 3: còn lại → bẻ
  else {
    ket_luan = "BẺ";
    ly_do = "Xu hướng yếu, gãy nhịp";
  }

  return {
    ket_luan,
    ly_do
  };
}

module.exports = phanTichChuoi;
