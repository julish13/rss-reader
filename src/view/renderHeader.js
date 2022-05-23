const renderHeader = (state, i18nextInstance) => {
  const header = document.querySelector('header');
  const titleElement = header.querySelector('.main-title');
  const subtitleElement = header.querySelector('.subtitle');
  const lngChangeButton = header.querySelector('.lng-change');

  titleElement.textContent = i18nextInstance.t('header.title');
  subtitleElement.textContent = i18nextInstance.t('header.subtitle');
  lngChangeButton.textContent = state.lng === 'en' ? 'ru' : 'en';
};

export default renderHeader;
