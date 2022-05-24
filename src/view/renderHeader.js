const renderHeader = (state, i18nextInstance) => {
  const header = document.querySelector('header');
  const titleElement = header.querySelector('.main-title');
  const subtitleElement = header.querySelector('.subtitle');
  const languageChangeButton = header.querySelector('.language-change');

  titleElement.textContent = i18nextInstance.t('header.title');
  subtitleElement.textContent = i18nextInstance.t('header.subtitle');
  languageChangeButton.textContent = state.language === 'en' ? 'ru' : 'en';
};

export default renderHeader;
