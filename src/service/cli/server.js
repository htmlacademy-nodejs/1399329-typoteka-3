'use strict';

const express = require(`express`);
const {getLogger, logMessages} = require(`../logger`);

const createApi = require(`../api`);
const {COMMANDS, API_PREFIX} = require(`../../constants`);

const startRequestLogger = require(`../middlewares/startRequestLogger`);
const notFoundRouteHandler = require(`../middlewares/notFoundRouteHandler`);
const {customErrorHandler, errorHandler} = require(`../middlewares/errors`);

const logger = getLogger();

const DEFAULT_PORT = 3000;

const createApp = async () => {
  const app = express();
  const apiRouter = await createApi();

  app.use(express.json());
  app.use(startRequestLogger);

  app.use(API_PREFIX, apiRouter);

  app.use(notFoundRouteHandler);
  app.use(customErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = {
  name: COMMANDS.SERVER,
  createServer: createApp,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = await createApp();

    app
      .listen(port, () => logger.info(logMessages.getStartServer(port)))
      .on(`error`, (error) => logger.error(logMessages.getErrorStartServer(error)));
  },
};
