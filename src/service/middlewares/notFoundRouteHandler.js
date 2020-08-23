'use strict';

const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);
const formatJsonError = require(`../lib/formatJsonError`);

const logger = getLogger();

const notFoundRouteHandler = (req, res) => {
  const code = HttpCode.NOT_FOUND;

  res.status(code).json(formatJsonError({code}));
  logger.error(logMessages.getNotFoundRoute(req.originalUrl, res.statusCode));
};

module.exports = notFoundRouteHandler;
