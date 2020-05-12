'use strict';

const express = require(`express`);
const ArticlesRoutes = new express.Router();

ArticlesRoutes.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));
ArticlesRoutes.get(`/add`, (_, res) => res.render(`new-post`));
ArticlesRoutes.get(`/edit/:id`, (_, res) => res.render(`edit-post`));
ArticlesRoutes.get(`/:id`, (_, res) => res.render(`post`));

module.exports = ArticlesRoutes;
