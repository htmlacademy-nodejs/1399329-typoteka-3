'use strict';

const express = require(`express`);
const articlesRoutes = new express.Router();

articlesRoutes.get(`/category/:id`, (_, res) => res.render(`articles-by-category`));
articlesRoutes.get(`/add`, (_, res) => res.render(`new-post`));
articlesRoutes.get(`/edit/:id`, (_, res) => res.render(`edit-post`));
articlesRoutes.get(`/:id`, (_, res) => res.render(`post`));

module.exports = articlesRoutes;
