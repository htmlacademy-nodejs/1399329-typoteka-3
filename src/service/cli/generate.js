"use strict";

const fs = require(`fs`).promises;
const path = require(`path`);
const { nanoid } = require(`nanoid`);
const log = require(`./console`);
const { getRandomInt, shuffle, toJSON } = require(`./utils`);
const { ExitCode, COMMANDS } = require(`../../constants`);
const {
  DEFAULT_COUNT,
  MAX_ANNOUNCE_COUNT,
  MONTH_COUNT,
  FILE_NAME,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
} = require(`../../constants/generate`);
const { validateGeneratePublications } = require(`./validation`);

const rootPath = process.cwd();
const FILE_SENTENCES_PATH = path.resolve(rootPath, `./data/sentences.txt`);
const FILE_CATEGORIES_PATH = path.resolve(rootPath, `./data/categories.txt`);
const FILE_TITLES_PATH = path.resolve(rootPath, `./data/titles.txt`);
const FILE_COMMENTS_PATH = path.resolve(rootPath, `./data/comments.txt`);

const { GENERATE } = COMMANDS;

const getTitle = (titles) => titles[getRandomInt(0, titles.length - 1)];

const getAnnounce = (announces, maxCount) =>
  shuffle(announces).slice(0, getRandomInt(1, maxCount)).join(` `);

const getFullText = (texts) =>
  shuffle(texts)
    .slice(getRandomInt(0, texts.length - 1))
    .join(` `);

const getCategory = (categories) =>
  shuffle(categories).slice(getRandomInt(0, categories.length - 1));

const createDate = (monthCount) => {
  const currentDate = Date.now();
  let previousDate = new Date();
  previousDate.setMonth(previousDate.getMonth() - monthCount);

  return new Date(getRandomInt(currentDate, previousDate));
};

const generateComments = (comments, maxCount) => {
  const commentsCount = getRandomInt(1, maxCount);

  return Array(commentsCount)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `),
    }));
};

const readContent = async (pathname) => {
  try {
    const content = await fs.readFile(pathname, `utf8`);
    return content
      .split(`\n`)
      .filter(Boolean)
      .map((string) => string.trim());
  } catch (error) {
    log.error(error);
    return [];
  }
};

const getContentFromFiles = async () => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const comments = await readContent(FILE_COMMENTS_PATH);

  return {
    sentences,
    categories,
    titles,
    comments,
  };
};

const generatePublications = async (count) => {
  const {
    sentences,
    categories,
    titles,
    comments,
  } = await getContentFromFiles();

  return Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(MAX_ID_LENGTH),
      title: getTitle(titles),
      announce: getAnnounce(sentences, MAX_ANNOUNCE_COUNT),
      fullText: getFullText(sentences),
      createdDate: createDate(MONTH_COUNT),
      category: getCategory(categories),
      comments: generateComments(comments, MAX_COMMENTS),
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
  async run(args) {
    const [count] = args;
    const countPublication = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const isValidPublications = validateGeneratePublications(countPublication);

    if (!isValidPublications) {
      process.exit(ExitCode.error);
    }

    const content = toJSON(await generatePublications(countPublication), {});
    await writeContentToFile(FILE_NAME, content);
  },
};
