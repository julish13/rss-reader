import _ from 'lodash';
import i18next from 'i18next';
import ru from './locales/ru.js';
import validateUrl from './utils/validator.js';
import watchedState from './view.js';
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
  const formElement = document.querySelector('.rss-form');
  const inputElement = formElement.querySelector('input');

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    const url = formData.get('url');
    validateUrl(url, watchedState(i18nextInstance).data.feeds)
      .then((link) => {
        watchedState(i18nextInstance).form.error = null;
        return link;
      })
      .then((link) => getData(link))
      .then((response) => {
        const {
          data: { contents },
        } = response;
        const id = _.uniqueId();
        const { title, description, posts } = parseFeed(contents);
        watchedState(i18nextInstance).data.feeds.unshift({
          id,
          url,
          title,
          description,
        });
        const allPosts = [
          ...watchedState(i18nextInstance).data.posts,
          ...posts.map((post) => ({ ...post, feedId: id })),
        ];
        watchedState(i18nextInstance).data.posts = _.orderBy(
          allPosts,
          'pubDate',
          'desc',
        );
        watchedState(i18nextInstance).form.processState = 'succeed';
        formElement.reset();
        inputElement.focus();
        inputElement.classList.remove('is-invalid');
      })
      .catch((error) => {
        watchedState(i18nextInstance).form.error = error;
        watchedState(i18nextInstance).form.processState = 'invalid';
        inputElement.classList.add('is-invalid');
      });
  });
};
