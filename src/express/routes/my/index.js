'use strict';

const express = require(`express`);
const MyRoutes = new express.Router();

MyRoutes.get(`/`, (_, res) => res.send(`/my`));
MyRoutes.get(`/comments`, (_, res) => res.send(`/my/comments`));

module.exports = MyRoutes;
