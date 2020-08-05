'use strict';

const express = require(`express`);
const postRouter = new express.Router();

const {HttpCode} = require(`../../constants`);

const findPost = require(`../middlewares/findPost`);
const {postValidator, commentValidator} = require(`../middlewares/validation`);

module.exports = (apiRouter, service, commentService) => {
  apiRouter.use(`/articles`, postRouter);

  postRouter.get(`/`, (_req, res) => {
    res.status(HttpCode.OK).json(service.getAll());
  });

  postRouter.get(`/:articleId`, findPost(service), (_req, res) => {
    const {post} = res.locals;
    res.status(HttpCode.OK).json(post);
  });

  postRouter.post(`/`, postValidator, (req, res) => {
    res.status(HttpCode.CREATED).json(service.create(req.body));
  });

  postRouter.put(`/:articleId`, [postValidator, findPost(service)], (req, res) => {
    const {post: currentPost} = res.locals;
    res.status(HttpCode.OK).json(service.update(currentPost, req.body));
  });

  postRouter.delete(`/:articleId`, findPost(service), (req, res) => {
    const {articleId} = req.params;

    service.drop(articleId);
    res.status(HttpCode.NO_CONTENT).send();
  });

  postRouter.get(`/:articleId/comments`, findPost(service), (_req, res) => {
    const {post} = res.locals;
    res.status(HttpCode.OK).json(commentService.getAll(post));
  });

  postRouter.post(`/:articleId/comments`, [commentValidator, findPost(service)], (req, res) => {
    const {post} = res.locals;
    res.status(HttpCode.CREATED).json(commentService.create(post, req.body));
  });

  postRouter.delete(`/:articleId/comments/:commentId`, findPost(service), (req, res) => {
    const {commentId} = req.params;
    const {post} = res.locals;

    commentService.drop(post, commentId);
    res.status(HttpCode.NO_CONTENT).send();
  });
};
