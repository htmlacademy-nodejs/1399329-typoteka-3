'use strict';

const express = require(`express`);
const ArticlesRoutes = new express.Router();

ArticlesRoutes.get(`/category/:id`, (_, res) => res.send(`/category/:id`));
ArticlesRoutes.get(`/add`, (_, res) => res.send(`/add`));
ArticlesRoutes.get(`/edit/:id`, (_, res) => res.send(`/edit/:id`));
ArticlesRoutes.get(`/:id`, (_, res) => res.send(`:id`));

module.exports = ArticlesRoutes;
