const renderErrorMessage = (feedback, i18nextInstance) => {
  console.log(feedback instanceof Error)
  const feedbackElement = document.querySelector('.feedback');
  if (feedback instanceof Error) {
    console.log(feedbackElement)
    feedbackElement.textContent = i18nextInstance.t(
      `form.errors.${feedback.message}`
    );
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
  } else {
    feedbackElement.textContent = '';
    feedbackElement.classList.remove('text-danger');
  }
};

export default renderErrorMessage;