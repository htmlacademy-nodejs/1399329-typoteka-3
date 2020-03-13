'use strict';

const log = require(`./console`);
const {HELP, VERSION, GENERATE} = require(`../../constants`).COMMANDS;

const helperText = `
  Программа формирует файл с данными (mock) для API.
  Команды:
  ${HELP}:               печатает этот текст
  ${VERSION}:            выводит номер версии
  ${GENERATE} <count>    формирует файл mocks.json
`;

module.exports = {
  name: HELP,
  run() {
    log.info(helperText);
  }
};
