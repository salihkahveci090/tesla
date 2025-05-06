const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// === AYARLAR ===
const URL = 'https://www.tesla.com/inventory/api/v4/inventory-results?query=%7B%22query%22%3A%7B%22model%22%3A%22my%22%2C%22condition%22%3A%22new%22%2C%22options%22%3A%7B%7D%2C%22arrangeby%22%3A%22Price%22%2C%22order%22%3A%22asc%22%2C%22market%22%3A%22TR%22%2C%22language%22%3A%22tr%22%2C%22super_region%22%3A%22north%20america%22%2C%22lng%22%3A43.90426069999999%2C%22lat%22%3A39.764534%2C%22zip%22%3A%2276000%22%2C%22range%22%3A0%2C%22region%22%3A%22TR%22%7D%2C%22offset%22%3A0%2C%22count%22%3A24%2C%22outsideOffset%22%3A0%2C%22outsideSearch%22%3Afalse%2C%22isFalconDeliverySelectionEnabled%22%3Atrue%2C%22version%22%3A%22v2%22%7D'; // <== BURAYA kendi API URL'ni koy
const TELEGRAM_TOKEN = '7639341656:AAGriHV0oMpot5Zc2RXC4lZc5EQLQzqIJbM'; // Bot tokenını buraya ekle
const CHAT_ID = '-4642791543'; // Chat ID buraya

// === TELEGRAM BOT OLUŞTUR ===
const bot = new TelegramBot(TELEGRAM_TOKEN);

// === SÜREKLİ KONTROL FONKSİYONU ===
async function checkData() {
  try {
    const response = await axios.get(URL);
    const data = response.data;

    const total = data?.total_matches_found;

    if (total && total > 0) {
      const message = `⚠️ Eşleşme bulundu!\nToplam eşleşme: ${total}`;
      await bot.sendMessage(CHAT_ID, message);
    } else {
      console.log(`[${new Date().toISOString()}] - Eşleşme yok.`);
    }

  } catch (error) {
    console.error('İstek hatası:', error.message);
  }
}

// === HER 1 SANİYEDE BİR ÇALIŞTIR ===
setInterval(checkData, 2000);
