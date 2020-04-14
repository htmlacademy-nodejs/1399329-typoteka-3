'use strict';

const log = require(`./console`);
const {HELP, VERSION, GENERATE, SERVER} = require(`../../constants`).COMMANDS;

const helperText = `
  Программа запускает http-сервер и формирует файл с данными (mock) для API.
  Команды:
  ${HELP}:               печатает этот текст
  ${VERSION}:            выводит номер версии
  ${GENERATE} <count>    формирует файл mocks.json
  ${SERVER} <port>       запускает http-сервер
`;

module.exports = {
  name: HELP,
  run() {
    log.text(helperText);
  }
};
