'use strict';

const COMMANDS = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`,
  SERVER: `--server`,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ErrorCodeText = {
  [HttpCode.NOT_FOUND]: `Not found`,
  [HttpCode.INTERNAL_SERVER_ERROR]: `Something went wrong`,
  [HttpCode.BAD_REQUEST]: `Bad Request`,
};

module.exports = {
  COMMANDS,
  DEFAULT_COMMAND: COMMANDS.HELP,
  USER_ARGV_INDEX: 2,
  API_PREFIX: `/api`,
  HttpCode,
  ErrorCodeText,
  ExitCode: {
    error: 1,
    success: 0,
  },
};
