'use strict';

const express = require(`express`);
const categoryRouter = new express.Router();

const {HttpCode} = require(`../../constants`);

module.exports = (apiRouter, service) => {
  apiRouter.use(`/categories`, categoryRouter);

  categoryRouter.get(`/`, (_req, res) => {
    res.status(HttpCode.OK).json(service.getAll());
  });
};
