'use strict';

const logger = require(`pino`)({
  name: `server:api`,
  level: process.env.LOG_LEVEL || `info`,
});

const logMessages = {
  getStartRequest: (url) => `Start request to ${url}`,
  getEndRequest: (url, statusCode) => `End request to ${url} with status code ${statusCode}`,
  getStartServer: (port) => `Server start on ${port}`,
  getErrorStartServer: (error) => `Server can't start. Error: ${error}`,
  getNotFoundRoute: (url, statusCode) =>
    `Request to ${url} failed. Route doesn't exist. Status code: ${statusCode}`,
  getCustomError: (error) =>
    `Custom error. Status code: ${error.code}. Error message: ${error.msg}`,
  getUnknownError: (error) => `Unknown error. Error: ${error}`,
};

module.exports = {
  logger,
  logMessages,
  getLogger(options = {}) {
    return logger.child(options);
  },
};
