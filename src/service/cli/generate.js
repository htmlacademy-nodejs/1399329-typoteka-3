'use strict';

const fs = require(`fs`).promises;
const log = require(`./console`);
const {getRandomInt, shuffle, toJSON} = require(`./utils`);
const {ExitCode, COMMANDS} = require(`../../constants`);
const {
  DEFAULT_COUNT,
  MAX_ANNOUNCE_COUNT,
  MONTH_COUNT,
  FILE_NAME
} = require(`../../constants/generate`);
const {
  TITLES,
  SENTENCES,
  CATEGORIES,
} = require(`../../constants/lists`);
const {validateGeneratePublications} = require(`./validation`);

const {GENERATE} = COMMANDS;

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getAnnounce = (announces, maxCount) => shuffle(announces).slice(0, getRandomInt(1, maxCount)).join(` `);

const getFullText = (texts) => shuffle(texts).slice(getRandomInt(0, texts.length - 1)).join(` `);

const getCategory = (categories) => shuffle(categories).slice(getRandomInt(0, categories.length - 1));

const createDate = (monthCount) => {
  const currentDate = Date.now();
  let previousDate = new Date();
  previousDate.setMonth(previousDate.getMonth() - monthCount);

  return new Date(getRandomInt(currentDate, previousDate));
};

const generatePublications = (count) => {
  return Array(count).fill({}).map(() => ({
    title: getTitle(TITLES),
    announce: getAnnounce(SENTENCES, MAX_ANNOUNCE_COUNT),
    fullText: getFullText(SENTENCES),
    createdDate: createDate(MONTH_COUNT),
    category: getCategory(CATEGORIES)
  }));
};

const writeContentToFile = async (fileName, content) => {
  try {
    await fs.writeFile(fileName, content);
    log.success(`Operation success. File created.`);
  } catch (error) {
    log.error(`Can't write data to file...`);
    process.exit(ExitCode.error);
  }
};

module.exports = {
  name: GENERATE,
  run(args) {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const isValidPublications = validateGeneratePublications(countPublication);

    if (!isValidPublications) {
      process.exit(ExitCode.error);
    }

    const content = toJSON(generatePublications(countPublication), {});

    writeContentToFile(FILE_NAME, content);
  }
};
