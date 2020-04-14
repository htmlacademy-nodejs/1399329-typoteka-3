'use strict';

const COMMANDS = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`,
  SERVER: `--server`
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

module.exports = {
  COMMANDS,
  DEFAULT_COMMAND: COMMANDS.HELP,
  USER_ARGV_INDEX: 2,
  HttpCode,
  ExitCode: {
    error: 1,
    success: 0,
  }
};
