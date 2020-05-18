'use strict';

const express = require(`express`);
const mainRoutes = new express.Router();

mainRoutes.get(`/`, (_, res) => res.render(`main`));
mainRoutes.get(`/register`, (_, res) => res.render(`auth/sign-up`));
mainRoutes.get(`/login`, (_, res) => res.render(`auth/login`));
mainRoutes.get(`/search`, (_, res) => res.render(`search`));
mainRoutes.get(`/categories`, (_, res) => res.render(`all-categories`));

module.exports = mainRoutes;
