import _ from 'lodash';
import axios from 'axios';
import parseFeed from './parser.js';
import validateUrl from './validator.js';
import watchedState from './view.js';

const form = document.querySelector('.rss-form');

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
        const urlProxified = `https://hexlet-allorigins.herokuapp.com/get?url=${
          encodeURIComponent(link)
        }`;
        return axios.get(urlProxified);
      })
      .then(({ data: { contents } }) => {
        const id = _.uniqueId();
        const { title, description, posts } = parseFeed(contents);
        watchedState.data.feeds.push({
          id, url, title, description,
        });
        watchedState.data.posts[id] = posts;
        watchedState.form.processState = 'succeed';
      })
      .catch((error) => {
        watchedState.form.error = error;
        watchedState.form.processState = 'invalid';
      });
  });
};
