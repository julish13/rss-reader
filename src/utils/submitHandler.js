/* eslint-disable no-param-reassign */

import _ from 'lodash';
import validateUrl from './validator.js';
import getData from './getData.js';
import parseFeed from './parser.js';

const submitHandler = (e, watchedState, formElement) => {
  e.preventDefault();
  const inputElement = formElement.querySelector('input');

  watchedState.form.processState = 'submitting';
  watchedState.form.feedback.success = null;
  watchedState.form.feedback.error = null;

  const formData = new FormData(formElement);
  const url = formData.get('url');

  validateUrl(url, watchedState.data.feeds)
    .then((link) => link)
    .then((link) => getData(link))
    .then((response) => {
      const {
        data: { contents },
      } = response;
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
      watchedState.form.feedback.success = true;
      formElement.reset();
      inputElement.focus();
      inputElement.classList.remove('is-invalid');
    })
    .catch((error) => {
      watchedState.form.feedback.error = error;
      watchedState.form.processState = 'invalid';
      inputElement.classList.add('is-invalid');
    });
};

export default submitHandler;
