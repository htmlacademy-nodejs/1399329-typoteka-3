'use strict';

const {HttpCode} = require(`../../constants`);

const INTERNAL_SERVER_MSG_TEXT = `Something went wrong`;

// eslint-disable-next-line  no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).send(INTERNAL_SERVER_MSG_TEXT);
};

module.exports = errorHandler;
