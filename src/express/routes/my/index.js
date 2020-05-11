'use strict';

const express = require(`express`);
const MyRoutes = new express.Router();

MyRoutes.get(`/`, (_, res) => res.render(`my`));
MyRoutes.get(`/comments`, (_, res) => res.render(`comments`));

module.exports = MyRoutes;
