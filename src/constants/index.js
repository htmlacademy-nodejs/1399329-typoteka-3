'use strict';

const COMMANDS = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`,
};

module.exports = {
  COMMANDS,
  DEFAULT_COMMAND: COMMANDS.HELP,
  USER_ARGV_INDEX: 2,
  ExitCode: {
    error: 1,
    success: 0,
  }
};
