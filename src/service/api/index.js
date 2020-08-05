'use strict';

const express = require(`express`);

const getMockData = require(`../lib/getMockData`);

const category = require(`./category`);
const post = require(`./post`);
const search = require(`./search`);
const {CategoryService, PostService, CommentService, SearchService} = require(`../data-service`);

const createApi = async () => {
  const apiRouter = new express.Router();
  const mockData = await getMockData();

  category(apiRouter, new CategoryService(mockData));
  post(apiRouter, new PostService(mockData), new CommentService());
  search(apiRouter, new SearchService(mockData));

  return apiRouter;
};

module.exports = createApi;
