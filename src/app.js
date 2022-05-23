import _ from 'lodash';
import i18next from 'i18next';
import ru from './locales/ru.js';
import en from './locales/en.js';
import validateUrl from './utils/validator.js';
import initWatchedState from './view.js';
import getData from './utils/getData.js';
import parseFeed from './utils/parser.js';

const defaultLanguage = 'ru';

export default async () => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.init({
    lng: defaultLanguage,
    debug: true,
    resources: {
      ru,
      en
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
    lng: defaultLanguage,
  };

  const formElement = document.querySelector('.rss-form');
  const inputElement = formElement.querySelector('input');
  const lngChangeButton = document.querySelector('.lng-change');

  const watchedState = initWatchedState(i18nextInstance, state);

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.form.processState = 'submitting';
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

  lngChangeButton.addEventListener('click', () => {
    console.log(i18nextInstance)
    // i18nextInstance.changeLanguage('en', (err, t) => {
    //   if (err) return console.log('something went wrong loading', err);
    //   t('key'); // -> same as i18next.t
    // });
  })
};
