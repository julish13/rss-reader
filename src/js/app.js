import onChange from 'on-change';
import validateUrl from './validation.js';

const form = document.querySelector('.rss-form');
const feeds = document.querySelector('.feeds');
const posts = document.querySelector('.posts');

export default () => {
  const state = {
    form: {
      validationError: null,
      processError: null,
    },
    feeds: [],
    posts: [],
  };

  const watchedState = onChange(state, (path, value) => {

  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = formData.get('url');
    validateUrl(data)
      .then((url) => {
        watchedState.feeds.push(url);
        watchedState.form.validationError = null;
      })
      .catch(({ errors: [error] }) => { watchedState.form.validationError = error; });
    // не уверена что это ок, но предполагается, что ошибка 1 всегда
    console.log(state);
  });
};
