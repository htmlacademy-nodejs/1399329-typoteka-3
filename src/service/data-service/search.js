'use strict';

class SearchService {
  constructor(posts) {
    this._posts = posts;
  }

  search(query) {
    const resultSearch = this._posts.filter((post) => {
      const title = post.title.toLowerCase();
      return title.includes(query.toLowerCase());
    });

    return resultSearch;
  }
}

module.exports = SearchService;
