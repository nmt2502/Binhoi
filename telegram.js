const axios = require("axios");

const BOT_TOKEN = "8249945917:AAEWCX3itsdNj364t-P8Im7fzRrPMlW8w10";
const CHAT_ID = "8213006748";

async function guiTelegram(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: CHAT_ID,
      text,
      parse_mode: "Markdown"
    });
  } catch (e) {
    console.log("Telegram lỗi");
  }
}

module.exports = guiTelegram;
