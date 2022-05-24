/* eslint-disable no-param-reassign */

const languageChangeHandler = (e, i18nextInstance, languageChangeButton, watchedState) => {
  e.preventDefault();
  const currentLanguage = i18nextInstance.language;
  const newLanguage = currentLanguage === 'ru' ? 'en' : 'ru';
  i18nextInstance.changeLanguage(newLanguage);
  watchedState.language = newLanguage;
  languageChangeButton.textContent = currentLanguage;
};

export default languageChangeHandler;
