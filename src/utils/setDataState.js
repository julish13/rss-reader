import _ from 'lodash';
import parseFeed from './parser.js';
import watchedState from '../view.js';

export default (data, url) => {
  const id = _.uniqueId();
  const { title, description, posts } = parseFeed(data);
  watchedState.data.feeds.unshift({
    id,
    url,
    title,
    description,
  });
  const allPosts = [
    ...watchedState.data.posts,
    ...posts.map((post) => ({ ...post, feedId: id })),
  ];
  watchedState.data.posts = _.orderBy(allPosts, 'pubDate', 'desc');
};
