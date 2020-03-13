'use strict';

const log = require(`./console`);
const packageJsonFile = require(`../../../package.json`);
const {VERSION} = require(`../../constants`).COMMANDS;

module.exports = {
  name: VERSION,
  run() {
    const version = packageJsonFile.version;
    log.info(version);
  }
};
