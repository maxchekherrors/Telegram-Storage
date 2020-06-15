'use strict';
const { getFile, upload, processUpdate } = require('./storageBot.controller');
const { password, prefix } = require('./../../config').storageBot;
module.exports = Router => {
  const router = new Router({
    prefix: `/${prefix}`,
  });
  router
    .get('/:fileId', getFile)
    .post(`/${password}`, processUpdate)
    .post('/', upload);

  return router;
};
