'use strict';

class CategoryService {
  constructor(posts) {
    this._posts = posts;
  }

  getAll() {
    const categories = this._posts.reduce((acc, post) => {
      acc.add(...post.category);
      return acc;
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;
