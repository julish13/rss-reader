const renderSuccessMessage = (feedback, i18nextInstance) => {
  const feedbackElement = document.querySelector('.feedback');
  if (feedback) {
    feedbackElement.textContent = i18nextInstance.t('form.successMessage');
    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    return;
  }
  feedbackElement.textContent = '';
  feedbackElement.classList.remove('text-success');
};

export default renderSuccessMessage;
