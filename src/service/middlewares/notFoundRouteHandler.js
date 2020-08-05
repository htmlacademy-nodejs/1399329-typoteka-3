'use strict';

const {HttpCode} = require(`../../constants`);
const formatJsonError = require(`../lib/formatJsonError`);

const notFoundRouteHandler = (_req, res) => {
  const code = HttpCode.NOT_FOUND;
  res.status(code).json(formatJsonError({code}));
};

module.exports = notFoundRouteHandler;
