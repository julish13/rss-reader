import onChange from 'on-change';
import state from './state.js';

const successMessage = 'RSS успешно загружен';

const renderFeeds = (value) => {
  const feedsElement = document.querySelector('.feeds');
  feedsElement.innerHTML = `<h2>Фиды</h2>
    <ul class="list-group mb-5">${value
    .map(
      ({ title, description }) => `<li class="list-group-item">
<h3>${title}</h3>
<p>${description}</p>
</li>`,
    )
    .join('\n')}</ul>`;
};

const renderPosts = (value) => {
  const postsElement = document.querySelector('.posts');
  postsElement.innerHTML = `<h2>Посты</h2>
    <ul class="list-group">${value
    .map(
      ({
        title,
        url,
      }) => `<li class="list-group-item d-flex justify-content-between align-items-start">
  <a href="${url}" class="font-weight-bold" data-id="2" target="_blank" rel="noopener noreferrer">
  ${title}
  </a>
  <button type="button" class="btn btn-primary btn-sm" data-id="2" data-toggle="modal" data-target="#modal">
  Просмотр
  </button>
</li>`,
    )
    .join('\n')}</ul>`;
};

const renderFeedback = (value) => {
  const feedbackElement = document.querySelector('.feedback');
  if (value === 'succeed') {
    feedbackElement.textContent = successMessage;
    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    return;
  }
  if (value instanceof Error) {
    feedbackElement.textContent = value.message;
    feedbackElement.classList.remove('text-success');
    feedbackElement.classList.add('text-danger');
  }
};

const watchedState = onChange(state, (path, value) => {
  switch (path) {
    case 'form.processState':
      renderFeedback(value);
      break;
    case 'form.error':
      renderFeedback(value);
      break;
    case 'data.feeds':
      renderFeeds(value);
      break;
    case 'data.posts':
      renderPosts(value);
      break;
    default:
      break;
  }
});

export default watchedState;
