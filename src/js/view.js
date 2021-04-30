import onChange from 'on-change';
import state from './state.js';

const successMessage = 'RSS успешно загружен';

const feedback = document.querySelector('.feedback');
const feeds = document.querySelector('.feeds');
const posts = document.querySelector('.posts');

const renderFeeds = (value) => {
  feeds.innerHTML = `<h2>Фиды</h2>
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
  posts.innerHTML = `<h2>Посты</h2>
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

const watchedState = onChange(state, (path, value) => {
  switch (path) {
    case 'form.processState':
      if (value === 'succeed') {
        feedback.textContent = successMessage;
        feedback.classList.remove('text-danger');
        feedback.classList.add('text-success');
      }
      break;
    case 'form.error':
      if (value) {
        feedback.textContent = value.message;
        feedback.classList.remove('text-success');
        feedback.classList.add('text-danger');
      }
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
