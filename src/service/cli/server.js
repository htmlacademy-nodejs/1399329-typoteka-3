'use strict';

const express = require(`express`);
const log = require(`./console`);

const createApi = require(`../api`);
const {COMMANDS, API_PREFIX} = require(`../../constants`);

const notFoundRouteHandler = require(`../middlewares/notFoundRouteHandler`);
const {customErrorHandler, errorHandler} = require(`../middlewares/errors`);

const DEFAULT_PORT = 3000;

const createApp = async () => {
  const app = express();
  const apiRouter = await createApi();

  app.use(express.json());

  app.use(API_PREFIX, apiRouter);

  app.use(notFoundRouteHandler);
  app.use(customErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = {
  name: COMMANDS.SERVER,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = await createApp();

    app
      .listen(port, () => log.success(`Ожидаю соединений на ${port}`))
      .on(`error`, (error) => log.error(`Ошибка при создании сервера`, error));
  },
};
