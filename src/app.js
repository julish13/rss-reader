import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import initWatchedState from './view/view.js';
import submitHandler from './utils/submitHandler.js';
import languageChangeHandler from './utils/languageChangeHandler.js';
import removeFeedHandler from './utils/removeFeedHandler.js';

const defaultLanguage = 'en';

export default async () => {
  const language = localStorage.getItem('language') || defaultLanguage;
  const feeds = localStorage.getItem('feeds')
    ? JSON.parse(localStorage.getItem('feeds'))
    : [];
  const posts = localStorage.getItem('posts')
    ? JSON.parse(localStorage.getItem('posts'))
    : [];

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

  const languageChangeButton = document.querySelector('.language-change');
  const formElement = document.querySelector('.rss-form');
  const feedsElement = document.querySelector('.feeds');

  languageChangeButton.addEventListener('click', (e) => {
    languageChangeHandler(
      e,
      i18nextInstance,
      languageChangeButton,
      watchedState,
    );
  });

  formElement.addEventListener('submit', (e) => {
    submitHandler(e, watchedState, formElement);
  });

  feedsElement.addEventListener('click', (e) => removeFeedHandler(e, watchedState));
};
