import _ from 'lodash';
import i18next from 'i18next';
import ru from './locales/ru.js';
import validateUrl from './utils/validator.js';
import initWatchedState from './view.js';
import getData from './utils/getData.js';
import parseFeed from './utils/parser.js';

export default async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const state = {
    form: {
      processState: 'initial',
      error: null,
    },
    data: {
      feeds: [],
      posts: [],
    },
  };

  const formElement = document.querySelector('.rss-form');
  const inputElement = formElement.querySelector('input');

  const watchedState = initWatchedState(i18nextInstance, state);

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const url = formData.get('url');
    validateUrl(url, watchedState.data.feeds)
      .then((link) => {
        watchedState.form.error = null;
        return link;
      })
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
        watchedState.data.posts = _.orderBy(
          allPosts,
          'pubDate',
          'desc',
        );
        watchedState.form.processState = 'succeed';
        formElement.reset();
        inputElement.focus();
        inputElement.classList.remove('is-invalid');
      })
      .catch((error) => {
        watchedState.form.error = error;
        watchedState.form.processState = 'invalid';
        inputElement.classList.add('is-invalid');
      });
  });
};
