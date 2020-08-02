'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants/generate`);

class CommentService {
  getAll(post) {
    return post.comments;
  }

  create(post, comment) {
    const createdComment = {
      id: nanoid(MAX_ID_LENGTH),
      ...comment,
    };

    post.comments.push(createdComment);
    return createdComment;
  }

  drop(post, commentId) {
    post.comments = post.comments.filter((comment) => comment.id !== commentId);
    return;
  }
}

module.exports = CommentService;
