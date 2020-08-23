'use strict';

const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {createServer} = require(`../cli/server`);

const ROOT_PATH = `/api/search`;
let server = null;

beforeAll(async () => {
  server = await createServer();
});

const mockPost = {
  title: `Как достигнуть успеха не вставая с кресла`,
  announce: `Вы можете достичь всего.`,
  fullText: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  category: [`За жизнь`, `Без рамки`],
};

describe(`Search API end-points ( ${ROOT_PATH} )`, () => {
  let postResponse;

  beforeAll(async () => {
    const addedPostResponse = await request(server).post(`/api/articles`).send(mockPost);
    const newPostResponse = await request(server).get(`/api/articles/${addedPostResponse.body.id}`);

    postResponse = newPostResponse.body;
  });

  afterAll(async () => {
    await request(server).delete(`/api/articles/${postResponse.id}`);
  });

  it(`when find post with query status code should be ${HttpCode.OK}`, async () => {
    const res = await request(server).get(encodeURI(`${ROOT_PATH}?query=${mockPost.title}`));
    expect(res.statusCode).toBe(HttpCode.OK);
  });

  it(`response should contain added post`, async () => {
    const res = await request(server).get(encodeURI(`${ROOT_PATH}?query=${mockPost.title}`));
    expect(res.body).toEqual(expect.arrayContaining([postResponse]));
  });

  it(`if get post with empty query status code should be ${HttpCode.OK}`, async () => {
    const res = await request(server).get(encodeURI(`${ROOT_PATH}?query=${mockPost.title}`));
    expect(res.statusCode).toBe(HttpCode.OK);
  });
});
