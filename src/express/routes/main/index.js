'use strict';

const express = require(`express`);
const MainRoutes = new express.Router();

MainRoutes.get(`/`, (_, res) => res.render(`main`));
MainRoutes.get(`/register`, (_, res) => res.render(`auth/sign-up`));
MainRoutes.get(`/login`, (_, res) => res.render(`auth/login`));
MainRoutes.get(`/search`, (_, res) => res.render(`search`));
MainRoutes.get(`/categories`, (_, res) => res.render(`all-categories`));

module.exports = MainRoutes;
