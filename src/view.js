import onChange from 'on-change';
import i18next from 'i18next';
import removeAllChildNodes from './utils/removeAllChildNodes.js';
import state from './state.js';

const renderFeeds = (feeds) => {
  const feedsElement = document.querySelector('.feeds');
  removeAllChildNodes(feedsElement);

  const headingElement = document.createElement('h2');
  headingElement.textContent = 'Фиды';

  const listElement = document.createElement('ul');
  listElement.classList.add('list-group', 'mb-5');

  feedsElement.appendChild(headingElement);
  feedsElement.appendChild(listElement);

  feeds.forEach(({ title, description }) => {
    const feedElement = document.createElement('li');
    feedElement.classList.add('list-group-item');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    feedElement.appendChild(titleElement);
    feedElement.appendChild(descriptionElement);
    listElement.appendChild(feedElement);
  });
};

const renderModal = (title, url, description) => {
  const modal = document.querySelector('.modal-content');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalLink = modal.querySelector('.full-article');

  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalLink.href = url;
};

const renderPosts = (posts) => {
  const postsElement = document.querySelector('.posts');
  removeAllChildNodes(postsElement);

  const headingElement = document.createElement('h2');
  headingElement.textContent = 'Посты';

  const listElement = document.createElement('ul');
  listElement.classList.add('list-group');

  postsElement.appendChild(headingElement);
  postsElement.appendChild(listElement);

  posts.forEach(({ title, url, description }) => {
    const postElement = document.createElement('li');
    postElement.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
    );

    const linkElement = document.createElement('a');
    linkElement.classList.add('fw-bold');
    linkElement.href = url;
    linkElement.setAttribute('data-id', '2');
    linkElement.setAttribute('target', '_blank');
    linkElement.setAttribute('rel', 'noopener noreferrer');
    linkElement.textContent = title;

    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.textContent = 'Просмотр';
    buttonElement.classList.add('btn', 'btn-primary', 'btn-sm');
    buttonElement.setAttribute('data-id', '2');
    buttonElement.setAttribute('data-toggle', 'modal');
    buttonElement.setAttribute('data-target', '#modal');
    buttonElement.onclick = () => {
      renderModal(title, url, description);
      linkElement.classList.remove('fw-bold');
      linkElement.classList.add('fw-normal');
    };

    postElement.appendChild(linkElement);
    postElement.appendChild(buttonElement);
    listElement.appendChild(postElement);
  });
};

const renderFeedback = (feedback) => {
  const feedbackElement = document.querySelector('.feedback');
  if (feedback === 'succeed') {
    feedbackElement.textContent = i18next.t('successMessage');
    feedbackElement.classList.remove('text-danger');
    feedbackElement.classList.add('text-success');
    return;
  }
  if (feedback instanceof Error) {
    feedbackElement.textContent = i18next.t(`errors.${feedback.message}`);
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
