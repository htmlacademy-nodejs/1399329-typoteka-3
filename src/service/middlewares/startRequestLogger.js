'use strict';

const {getLogger, logMessages} = require(`../logger`);
const logger = getLogger();

module.exports = (req, _res, next) => {
  logger.debug(logMessages.getStartRequest(req.originalUrl));
  next();
};
