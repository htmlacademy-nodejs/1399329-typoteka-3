'use strict';

const {getLogger, logMessages} = require(`../../logger`);
const {HttpCode} = require(`../../../constants`);
const formatJsonError = require(`../../lib/formatJsonError`);

const logger = getLogger();

const errorHandler = (err, _req, res, _next) => {
  const code = HttpCode.INTERNAL_SERVER_ERROR;

  res.status(code).json(formatJsonError({code}));
  logger.error(logMessages.getUnknownError(err));
};

module.exports = errorHandler;
