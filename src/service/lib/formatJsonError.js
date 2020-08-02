'use strict';

const {ErrorCodeText} = require(`../../constants`);

const formatJsonError = (error = {}) => {
  const {code, msg} = error;

  return {
    code,
    msg: msg || ErrorCodeText[code],
  };
};

module.exports = formatJsonError;
