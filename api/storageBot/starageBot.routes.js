'use strict';

const controller = require('./storageBot.controller');
const config = require('./../../config').storageBot;
module.exports = Router => {
  const router = new Router({
    prefix: `/${config.prefix}`,
  });

  router
    .get('/:fileId', controller.getFile)
    .post(`/${config.password}`, controller.processUpdate)
    .post('/', controller.upload);

  return router;
};
