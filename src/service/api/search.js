'use strict';

const express = require(`express`);
const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);

const searchRouter = new express.Router();
const logger = getLogger();

module.exports = (apiRouter, service) => {
  apiRouter.use(`/search`, searchRouter);

  searchRouter.get(`/`, (req, res) => {
    const {query} = req.query;

    res.status(HttpCode.OK).json(service.search(query));
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });
};
