'use strict';

const express = require(`express`);
const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);

const categoryRouter = new express.Router();
const logger = getLogger();

module.exports = (apiRouter, service) => {
  apiRouter.use(`/categories`, categoryRouter);

  categoryRouter.get(`/`, (req, res) => {
    res.status(HttpCode.OK).json(service.getAll());
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });
};
