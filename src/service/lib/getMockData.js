'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../../constants/generate`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    return [];
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
