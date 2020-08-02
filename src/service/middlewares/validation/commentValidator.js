'use strict';

const {HttpCode} = require(`../../../constants`);

// TODO: изменить, когда появится подключение к базе (MG string)
const commentKeys = [`text`];

const commentValidator = (req, _res, next) => {
  const createdComment = req.body;
  const createdCommentKeys = Object.keys(createdComment);

  if (!createdCommentKeys.length) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Comment can't be empty`});
  }

  const isValid = createdCommentKeys.every((key) => commentKeys.includes(key));

  if (!isValid) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Invalid comment`});
  }

  return next();
};

module.exports = commentValidator;
