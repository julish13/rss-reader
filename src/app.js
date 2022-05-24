import _ from 'lodash';
import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import validateUrl from './utils/validator.js';
import initWatchedState from './view/view.js';
import getData from './utils/getData.js';
import parseFeed from './utils/parser.js';

const defaultLanguage = 'ru';

export default async () => {
  const language = localStorage.getItem('language') || defaultLanguage;
  const feeds = localStorage.getItem('feeds') ? JSON.parse(localStorage.getItem('feeds')) : [];
  const posts = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts')) : [];

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: language,
    debug: true,
    resources: {
      ru,
      en,
    },
  });

  const state = {
    form: {
      processState: 'initial',
      feedback: {
        error: null,
        success: null,
      },
    },
    data: {
      feeds,
      posts,
    },
    language: null,
  };

  const watchedState = initWatchedState(i18nextInstance, state);

  watchedState.language = language;

  const formElement = document.querySelector('.rss-form');
  const inputElement = formElement.querySelector('input');
  const languageChangeButton = document.querySelector('.language-change');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.processState = 'submitting';
    watchedState.form.feedback.success = null;
    watchedState.form.feedback.error = null;
    const formData = new FormData(formElement);
    const url = formData.get('url');
    validateUrl(url, watchedState.data.feeds)
      .then((link) => {
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
  });

  languageChangeButton.addEventListener('click', () => {
    const currentLanguage = i18nextInstance.language;
    const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
    i18nextInstance.changeLanguage(newLanguage, (err) => {
      if (err) return console.log('something went wrong loading', err);
    });
    watchedState.language = newLanguage;
    languageChangeButton.textContent = currentLanguage;
  });
};
