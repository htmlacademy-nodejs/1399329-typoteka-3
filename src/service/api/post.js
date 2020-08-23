'use strict';

const express = require(`express`);
const {getLogger, logMessages} = require(`../logger`);
const {HttpCode} = require(`../../constants`);

const findPost = require(`../middlewares/findPost`);
const {postValidator, commentValidator} = require(`../middlewares/validation`);

const postRouter = new express.Router();
const logger = getLogger();

module.exports = (apiRouter, service, commentService) => {
  apiRouter.use(`/articles`, postRouter);

  postRouter.get(`/`, (req, res) => {
    res.status(HttpCode.OK).json(service.getAll());
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.get(`/:articleId`, findPost(service), (req, res) => {
    const {post} = res.locals;

    res.status(HttpCode.OK).json(post);
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.post(`/`, postValidator, (req, res) => {
    res.status(HttpCode.CREATED).json(service.create(req.body));
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.put(`/:articleId`, [postValidator, findPost(service)], (req, res) => {
    const {post: currentPost} = res.locals;

    res.status(HttpCode.OK).json(service.update(currentPost, req.body));
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.delete(`/:articleId`, findPost(service), (req, res) => {
    const {articleId} = req.params;

    service.drop(articleId);
    res.status(HttpCode.NO_CONTENT).send();

    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.get(`/:articleId/comments`, findPost(service), (req, res) => {
    const {post} = res.locals;

    res.status(HttpCode.OK).json(commentService.getAll(post));
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.post(`/:articleId/comments`, [commentValidator, findPost(service)], (req, res) => {
    const {post} = res.locals;

    res.status(HttpCode.CREATED).json(commentService.create(post, req.body));
    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });

  postRouter.delete(`/:articleId/comments/:commentId`, findPost(service), (req, res) => {
    const {commentId} = req.params;
    const {post} = res.locals;

    commentService.drop(post, commentId);
    res.status(HttpCode.NO_CONTENT).send();

    logger.info(logMessages.getEndRequest(req.originalUrl, res.statusCode));
  });
};
