'use strict';

const request = require(`supertest`);
const {HttpCode} = require(`../../constants`);
const {createServer} = require(`../cli/server`);

const ROOT_PATH = `/api/articles`;
let server = null;

const mockPost = {
  title: `Как достигнуть успеха не вставая с кресла`,
  announce: `Вы можете достичь всего.`,
  fullText: `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  category: [`За жизнь`, `Без рамки`],
};

const mockComment = {
  text: `new comment`,
};

const findElementById = (array, id) => array.find((item) => item.id === id);

beforeAll(async () => {
  server = await createServer();
});

describe(`Posts API end-points ( ${ROOT_PATH} )`, () => {
  describe(`Get all posts`, () => {
    it(`when get posts status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).get(ROOT_PATH);
      expect(res.status).toBe(HttpCode.OK);
    });

    it(`should return an array`, async () => {
      const res = await request(server).get(ROOT_PATH);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe(`Get post by id`, () => {
    const wrongId = `wrongId`;
    let newPostId;

    beforeAll(async () => {
      const newPostResponse = await request(server).post(ROOT_PATH).send(mockPost);

      const {id} = newPostResponse.body;
      newPostId = id;
    });

    afterAll(async () => {
      await request(server).delete(`${ROOT_PATH}/${newPostId}`);
    });

    it(`when get post by id status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).get(`${ROOT_PATH}/${newPostId}`);
      expect(res.status).toBe(HttpCode.OK);
    });

    it(`should return 404 if id doesn't exists`, async () => {
      const res = await request(server).get(`${ROOT_PATH}/${wrongId}`);
      expect(res.status).toBe(HttpCode.NOT_FOUND);
    });
  });

  // TODO: стоит создать один раз?
  describe(`Create post`, () => {
    it(`when create post status code should be ${HttpCode.CREATED}`, async () => {
      const res = await request(server).post(ROOT_PATH).send(mockPost);
      expect(res.status).toBe(HttpCode.CREATED);
    });

    it(`should retrieve post with fields id and comments`, async () => {
      const res = await request(server).post(ROOT_PATH).send(mockPost);
      const {id} = res.body;

      const postResponse = await request(server).get(`${ROOT_PATH}/${id}`);

      expect(id).toBe(postResponse.body.id);
      expect(postResponse.body).toHaveProperty(`id`);
      expect(postResponse.body).toHaveProperty(`comments`);

      expect(Array.isArray(postResponse.body.comments)).toBeTruthy();
    });

    it(`Should retrieve post with title`, async () => {
      const res = await request(server).post(ROOT_PATH).send(mockPost);
      const {id} = res.body;

      const postResponse = await request(server).get(`${ROOT_PATH}/${id}`);
      expect(postResponse.body.title).toBe(mockPost.title);
    });

    it(`Should 400 because title property doesn't exists`, async () => {
      const {title, ...rest} = mockPost;
      const invalidMockPost = {name: title, ...rest};

      const res = await request(server).post(ROOT_PATH).send(invalidMockPost);
      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`Should 400 because body is empty`, async () => {
      const res = await request(server).post(ROOT_PATH).send({});
      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Update post`, () => {
    let newPostId;

    beforeAll(async () => {
      const newPostResponse = await request(server).post(ROOT_PATH).send(mockPost);

      const {id} = newPostResponse.body;
      newPostId = id;
    });

    afterAll(async () => {
      await request(server).delete(`${ROOT_PATH}/${newPostId}`);
    });

    it(`when update post status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).put(`${ROOT_PATH}/${newPostId}`).send(mockPost);

      expect(res.status).toBe(HttpCode.OK);
    });

    it(`should return an updated post`, async () => {
      const updatedPost = {...mockPost, title: `Updated title`};

      const res = await request(server).put(`${ROOT_PATH}/${newPostId}`).send(updatedPost);

      const postResponse = await request(server).get(`${ROOT_PATH}/${newPostId}`);

      expect(res.body.id).toBe(newPostId);
      expect(res.body.title).toBe(updatedPost.title);
      expect(postResponse.body.title).toBe(updatedPost.title);
    });

    it(`should return 400 because title property doesn't exists`, async () => {
      const {title, ...rest} = mockPost;
      const invalidMockPost = {name: title, ...rest};

      const res = await request(server).put(`${ROOT_PATH}/${newPostId}`).send(invalidMockPost);
      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`should return 400 because body is empty`, async () => {
      const res = await request(server).put(`${ROOT_PATH}/${newPostId}`).send({});

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`should return 404 if id is wrong`, async () => {
      const wrongId = `wrongId`;
      const res = await request(server).put(`${ROOT_PATH}/${wrongId}`).send(mockPost);

      expect(res.status).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Delete post`, () => {
    let newPostId;

    beforeAll(async () => {
      const newPostResponse = await request(server).post(ROOT_PATH).send(mockPost);

      const {id} = newPostResponse.body;
      newPostId = id;
    });

    it(`when delete post status code should be ${HttpCode.NO_CONTENT}`, async () => {
      const res = await request(server).delete(`${ROOT_PATH}/${newPostId}`).send(mockPost);

      expect(res.status).toBe(HttpCode.NO_CONTENT);
    });

    it(`should return 404 if id is wrong`, async () => {
      const wrongId = `wrongId`;
      const res = await request(server).delete(`${ROOT_PATH}/${wrongId}`);

      expect(res.status).toBe(HttpCode.NOT_FOUND);
    });

    it(`after delete request for post should return 404`, async () => {
      const removedPost = await request(server).get(`${ROOT_PATH}/${newPostId}`);
      expect(removedPost.status).toBe(HttpCode.NOT_FOUND);
    });
  });
});

describe(`Post comments API end-points ( ${ROOT_PATH}/{postID}/comments )`, () => {
  let newPostId;

  beforeAll(async () => {
    const newPostResponse = await request(server).post(ROOT_PATH).send(mockPost);

    const {id} = newPostResponse.body;
    newPostId = id;
  });

  afterAll(async () => {
    await request(server).delete(`${ROOT_PATH}/${newPostId}`);
  });

  describe(`Get post comments`, () => {
    it(`when get post comment status code should be ${HttpCode.OK}`, async () => {
      const res = await request(server).get(`${ROOT_PATH}/${newPostId}/comments`);

      expect(res.status).toBe(HttpCode.OK);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe(`Create post comment`, () => {
    it(`when create comment status code should be ${HttpCode.CREATED}`, async () => {
      const res = await request(server)
        .post(`${ROOT_PATH}/${newPostId}/comments`)
        .send(mockComment);

      expect(res.status).toBe(HttpCode.CREATED);
    });

    it(`should retrieve comment with fields id and text`, async () => {
      const res = await request(server)
        .post(`${ROOT_PATH}/${newPostId}/comments`)
        .send(mockComment);

      const commentsResponse = await request(server).get(`${ROOT_PATH}/${newPostId}/comments`);

      const createdCommentId = res.body.id;
      const createdComment = findElementById(commentsResponse.body, createdCommentId);

      expect(res.body.id).toBe(createdComment.id);
      expect(createdComment).toHaveProperty(`id`);
      expect(createdComment).toHaveProperty(`text`);
      expect(createdComment.text).toBe(mockComment.text);
    });

    it(`Should 400 because text property doesn't exists`, async () => {
      const invalidMockComment = {title: mockComment.text};
      const res = await request(server)
        .post(`${ROOT_PATH}/${newPostId}/comments`)
        .send(invalidMockComment);

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });

    it(`Should 400 because body is empty`, async () => {
      const res = await request(server).post(`${ROOT_PATH}/${newPostId}/comments`).send({});

      expect(res.status).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Delete post comment`, () => {
    let newCommentId;

    beforeAll(async () => {
      const newCommentResponse = await request(server)
        .post(`${ROOT_PATH}/${newPostId}/comments`)
        .send(mockComment);

      newCommentId = newCommentResponse.body.id;
    });

    it(`when delete comment status code should be ${HttpCode.NO_CONTENT}`, async () => {
      const res = await request(server).delete(`${ROOT_PATH}/${newPostId}/comments/${newCommentId}`);

      expect(res.status).toBe(HttpCode.NO_CONTENT);
    });

    it(`after delete comment should not be in the post comments list`, async () => {
      const commentsResponse = await request(server).get(`${ROOT_PATH}/${newPostId}/comments`);
      const deletedComment = findElementById(commentsResponse.body, newCommentId);

      expect(deletedComment).toBeUndefined();
    });
  });
});
