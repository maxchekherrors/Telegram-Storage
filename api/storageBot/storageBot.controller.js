const bot = require('./storageBot.model');
const config = require('./../../config/index').storageBot;
bot.on('message', mes => {
  if (mes.text && mes.text.match('/')) return;
  if (mes.document)
    bot.sendMessage(mes.chat.id, `${config.fileLink}/${mes.document.file_id}`);
  else
    bot.sendMessage(mes.chat.id, `Sorry, i don't see the file.
It seems you didn't understand what I needed.
Use the /help command to not feel like an ass🏳️‍🌈`,
    );
});
exports.upload = async ctx => {
  const { file } = ctx;
  const { filename } = ctx.request.body;
  await bot
    .sendDocument(
      config.storageChat,
      file.buffer,
      {},
      { filename: `${filename || file.originalname}` },
    )
    .then(res => {
      ctx.body = `${config.fileLink}/${res.document.file_id}`;
    })
    .catch(err => {
      ctx.body = err;
      ctx.status = 500;
    });
};

exports.getFile = async ctx => {
  const { fileId } = ctx.params;
  ctx.body = bot.getFileStream(fileId);
};

exports.processUpdate = async ctx => {
  await bot.processUpdate(ctx.request.body);
  ctx.status = 200;
};
