'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);

const Cli = {
  [help.name]: help,
  [version.name]: version,
  [generate.name]: generate
};

module.exports = {
  Cli
};
