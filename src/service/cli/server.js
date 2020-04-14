'use strict';

const http = require(`http`);
const fs = require(`fs`).promises;
const path = require(`path`);
const log = require(`./console`);

const {HttpCode, COMMANDS} = require(`../../constants`);

const DEFAULT_PORT = 3000;
const FILE_MOCKS_PATH = path.resolve(process.cwd(), `mocks.json`);

const NOT_FOUND_MSG_TEXT = `Not found`;

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_MOCKS_PATH);
        const mocks = JSON.parse(fileContent);

        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (error) {
        sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MSG_TEXT);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MSG_TEXT);
      break;
  }
};

module.exports = {
  name: COMMANDS.SERVER,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (error) => {
        if (error) {
          log.error(`Ошибка при создании сервера`, error);
        }

        return log.success(`Ожидаю соединений на ${port}`);
      });
  }
};
