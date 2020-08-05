'use strict';

const {HttpCode} = require(`../../../constants`);

// TODO: изменить, когда появится подключение к базе (MG string)
const postKeys = [`title`, `announce`, `fullText`, `createdDate`, `category`];

const postValidator = (req, _res, next) => {
  const createdPost = req.body;
  const createdPostKeys = Object.keys(createdPost);

  if (!createdPostKeys.length) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Post can't be empty`});
  }

  const isValid = createdPostKeys.every((key) => postKeys.includes(key));

  if (!isValid) {
    return next({code: HttpCode.BAD_REQUEST, msg: `Invalid post`});
  }

  return next();
};

module.exports = postValidator;
