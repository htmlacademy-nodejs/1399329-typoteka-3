'use strict';

const chalk = require(`chalk`);
const log = console.log;

const logSettings = {
  text: `gray`,
  info: `blue`,
  error: `red`,
  success: `green`
};

const generateLogs = () => (
  Object.entries(logSettings).reduce((acc, elem) => {
    const [method, color] = elem;
    return {
      ...acc,
      [method]: (...args) => log(chalk[color](...args))
    };
  }, {})
);

module.exports = generateLogs();
