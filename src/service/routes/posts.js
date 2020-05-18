'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const path = require(`path`);
const {HttpCode} = require(`../../constants`);

const postsRouter = new express.Router();

const FILE_MOCKS_PATH = path.resolve(process.cwd(), `mocks.json`);

const readFileContent = async (pathname) => {
  try {
    const fileContent = await fs.readFile(pathname, `utf8`);
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
};

postsRouter.get(`/`, async (_, res, next) => {
  try {
    const mocks = await readFileContent(FILE_MOCKS_PATH);
    res.status(HttpCode.OK).json(mocks);
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;