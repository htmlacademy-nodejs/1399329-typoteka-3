'use strict';

const log = require(`../console`);
const {
  DEFAULT_COUNT,
  MAX_PUBLICATIONS
} = require(`../../../constants/generate`);

const validateGeneratePublications = (publications) => {
  if (publications < 0) {
    log.error(`Минимальное число публикаций: ${DEFAULT_COUNT}`);
    return false;
  }

  if (publications > MAX_PUBLICATIONS) {
    log.error(`Не больше ${MAX_PUBLICATIONS} публикаций`);
    return false;
  }

  return true;
};

module.exports = {
  validateGeneratePublications
};
