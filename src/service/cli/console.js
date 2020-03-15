'use strict';

const chalk = require(`chalk`);
const log = console.log;

const info = (...args) => log(chalk.blue(...args));
const error = (...args) => log(chalk.red(...args));
const success = (...args) => log(chalk.green(...args));

module.exports = {
  info,
  error,
  success
};
