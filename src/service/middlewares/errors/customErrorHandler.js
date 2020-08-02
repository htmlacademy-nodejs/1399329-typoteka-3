'use strict';

const formatJsonError = require(`../../lib/formatJsonError`);

const customErrorHandler = (error, _req, res, next) => {
  if (error && error.code) {
    res.status(error.code).json(formatJsonError(error));
  } else {
    next(error);
  }
};

module.exports = customErrorHandler;
