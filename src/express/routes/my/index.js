'use strict';

const express = require(`express`);
const myRoutes = new express.Router();

myRoutes.get(`/`, (_, res) => res.render(`my`));
myRoutes.get(`/comments`, (_, res) => res.render(`comments`));

module.exports = myRoutes;
