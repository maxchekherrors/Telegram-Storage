const Bot = require('node-telegram-bot-api');
const config = require('./../../config').storageBot;
const bot = new Bot(config.token);
bot.setWebHook(`${config.webHook}`);

module.exports = bot;
