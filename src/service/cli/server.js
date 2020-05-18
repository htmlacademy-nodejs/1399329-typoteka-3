'use strict';

const express = require(`express`);
const log = require(`./console`);

const {COMMANDS} = require(`../../constants`);

const postsRouter = require(`../routes/posts`);

const notFoundRouteHandler = require(`../handlers/notFoundRouteHandler`);
const errorHandler = require(`../handlers/errorHandler`);

const DEFAULT_PORT = 3000;

const app = express();
app.use(express.json());

app.use(`/posts`, postsRouter);

app.use(notFoundRouteHandler);
app.use(errorHandler);

module.exports = {
  name: COMMANDS.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app
      .listen(port, () => log.success(`Ожидаю соединений на ${port}`))
      .on(`error`, (error) => log.error(`Ошибка при создании сервера`, error));
  }
};
