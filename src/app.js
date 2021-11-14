import i18next from 'i18next';
import ru from './locales/ru.js';
import validateUrl from './utils/validator.js';
import watchedState from './view.js';
import getData from './utils/getData.js';
import setDataState from './utils/setDataState.js';

export default async () => {
  await i18next.init({
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
    console.log(url)
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
        setDataState(contents, url);
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
