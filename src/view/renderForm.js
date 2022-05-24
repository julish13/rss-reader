const renderForm = (processState, i18nextInstance) => {
  const formElement = document.querySelector('.rss-form');
  const inputElement = formElement.querySelector('input');
  const submitButton = formElement.querySelector('button');
  const labelElement = formElement.querySelector('label');
  const exampleElement = document.querySelector('.example');

  if (processState === 'submitting') {
    inputElement.setAttribute('readonly', true);
    formElement.setAttribute('disabled', true);
    submitButton.setAttribute('disabled', true);
  } else {
    inputElement.removeAttribute('readonly');
    formElement.removeAttribute('disabled');
    submitButton.removeAttribute('disabled');
  }

  labelElement.textContent = i18nextInstance.t('form.label');
  exampleElement.textContent = i18nextInstance.t('form.example');
  submitButton.textContent = i18nextInstance.t('form.add');
  inputElement.placeholder = i18nextInstance.t('form.label');
};

export default renderForm;
