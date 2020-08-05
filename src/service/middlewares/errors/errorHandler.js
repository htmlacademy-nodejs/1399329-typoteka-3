'use strict';

const log = require(`../../cli/console`);
const {HttpCode} = require(`../../../constants`);
const formatJsonError = require(`../../lib/formatJsonError`);

const errorHandler = (err, _req, res, _next) => {
  log.error(err, err.stack);

  const code = HttpCode.INTERNAL_SERVER_ERROR;
  res.status(code).json(formatJsonError({code}));
};

module.exports = errorHandler;
