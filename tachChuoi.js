function tachChuoi(chuoi) {
  if (!chuoi || chuoi.length < 2) return [];
  const res = [];
  let cur = chuoi[0];

  for (let i = 1; i < chuoi.length; i++) {
    if (chuoi[i] === chuoi[i - 1]) cur += chuoi[i];
    else {
      res.push(cur);
      cur = chuoi[i];
    }
  }
  res.push(cur);
  return res;
}

module.exports = { tachChuoi };
