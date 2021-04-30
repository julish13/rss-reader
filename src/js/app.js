import _ from 'lodash';
import axios from 'axios';
import parseFeed from './parser.js';
import validateUrl from './validator.js';
import watchedState from './view.js';

const form = document.querySelector('.rss-form');
const input = form.querySelector('input');

export default () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    validateUrl(url, watchedState.data.feeds)
      .then((link) => {
        watchedState.form.error = null;
        return link;
      })
      .then((link) => {
        const urlProxified = `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(
          link,
        )}`;
        return axios.get(urlProxified);
      })
      .then(({ data: { contents } }) => {
        const id = _.uniqueId();
        const { title, description, posts } = parseFeed(contents);
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
        watchedState.form.processState = 'succeed';
        form.reset();
        input.focus();
      })
      .catch((error) => {
        watchedState.form.error = error;
        watchedState.form.processState = 'invalid';
      });
  });
};
