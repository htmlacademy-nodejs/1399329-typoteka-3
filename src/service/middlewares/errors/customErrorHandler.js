'use strict';

const {getLogger, logMessages} = require(`../../logger`);
const formatJsonError = require(`../../lib/formatJsonError`);

const logger = getLogger();

const customErrorHandler = (error, _req, res, next) => {
  if (error && error.code) {
    res.status(error.code).json(formatJsonError(error));
    logger.error(logMessages.getCustomError(error));
  } else {
    next(error);
  }
};

module.exports = customErrorHandler;
