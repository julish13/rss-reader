import _ from 'lodash';
import parseFeed from './parser.js';
import validateUrl from './validator.js';
import watchedState from './view.js';
import getData from './getData.js';

export default () => {
  const formElement = document.querySelector('.rss-form');
  const inputElement = formElement.querySelector('input');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const url = formData.get('url');
    validateUrl(url, watchedState.data.feeds)
      .then((link) => {
        watchedState.form.error = null;
        return link;
      })
      .then((link) => {
        return getData(link);
      })
      .then((response) => {
        const { data: { contents } } = response;
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
        formElement.reset();
        inputElement.focus();
        inputElement.classList.remove('is-invalid')
      })
      .catch((error) => {
        watchedState.form.error = error;
        watchedState.form.processState = 'invalid';
        inputElement.classList.add('is-invalid');
      });
  });
};
