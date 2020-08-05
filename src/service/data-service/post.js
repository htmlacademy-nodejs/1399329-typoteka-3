'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants/generate`);

class PostService {
  constructor(posts) {
    this._posts = posts;
  }

  getAll() {
    return this._posts;
  }

  getById(id) {
    return this._posts.find((post) => post.id === id);
  }

  create(post) {
    const createdPost = {
      ...post,
      id: nanoid(MAX_ID_LENGTH),
      comments: [],
    };

    this._posts.push(createdPost);
    return createdPost;
  }

  update(oldPost, newPost) {
    const index = this._posts.findIndex((post) => post.id === oldPost.id);
    const updatedPost = {...oldPost, ...newPost};

    this._posts[index] = updatedPost;
    return updatedPost;
  }

  drop(id) {
    this._posts = this._posts.filter((post) => post.id !== id);
  }
}

module.exports = PostService;
