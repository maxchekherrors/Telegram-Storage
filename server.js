const Koa = require('koa');
const bodyParser = require('koa-bodyparser')();
const compress = require('koa-compress')();
const cors = require('@koa/cors')({ allowMethods: ['POST', 'GET'] });
const helmet = require('koa-helmet')(/* Add your security option */);
const logger = require('koa-logger')();
const multer = require('@koa/multer');
const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');
const { isDevelopment } = require('./config');

const server = new Koa();
const upload = multer();

if (isDevelopment) {
  server.use(logger);
}

server
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser)
  .use(upload.single('document'));

applyApiMiddleware(server);

module.exports = server;
