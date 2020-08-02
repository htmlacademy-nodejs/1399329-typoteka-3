'use strict';

const {HttpCode} = require(`../../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const post = service.getById(articleId);

  if (!post) {
    return next({
      code: HttpCode.NOT_FOUND,
      message: `Post with ${articleId} not found`,
    });
  }

  res.locals.post = post;
  return next();
};
