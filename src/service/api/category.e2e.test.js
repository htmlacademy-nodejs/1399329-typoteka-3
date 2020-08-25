'use strict';

const request = require(`supertest`);
const {createServer} = require(`../cli/server`);
const {HttpCode} = require(`../../constants`);

const ROOT_PATH = `/api/categories`;
let server = null;

const checkItemsType = (array, type = `string`) => {
  return array.every((item) => typeof item === type);
};

beforeAll(async () => {
  server = await createServer();
});

describe(`Categories API end-points ( ${ROOT_PATH} )`, () => {
  it(`when get categories status code should be ${HttpCode.OK}`, async () => {
    const res = await request(server).get(ROOT_PATH);
    expect(res.status).toBe(HttpCode.OK);
  });

  it(`should return an array, and each item of the array must be a string`, async () => {
    const res = await request(server).get(ROOT_PATH);

    expect(Array.isArray(res.body)).toBeTruthy();
    expect(checkItemsType(res.body)).toBeTruthy();
  });
});
