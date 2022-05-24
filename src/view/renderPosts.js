import removeAllChildNodes from '../utils/removeAllChildNodes.js';
import renderModal from './renderModal.js';

const renderPosts = (posts, i18nextInstance) => {
  const postsElement = document.querySelector('.posts');
  removeAllChildNodes(postsElement);

  if (posts.length === 0) {
    return;
  }

  const headingElement = document.createElement('h2');
  headingElement.textContent = i18nextInstance.t('posts.title');

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
    linkElement.onclick = () => {
      linkElement.classList.remove('fw-bold');
      linkElement.classList.add('fw-normal');
    };

    const buttonElement = document.createElement('button');
    buttonElement.type = 'button';
    buttonElement.textContent = i18nextInstance.t('posts.watchLink');
    buttonElement.classList.add('btn', 'btn-primary', 'btn-sm');
    buttonElement.setAttribute('data-id', '2');
    buttonElement.setAttribute('data-toggle', 'modal');
    buttonElement.setAttribute('data-target', '#modal');
    buttonElement.onclick = () => {
      renderModal({ title, url, description }, i18nextInstance);
      linkElement.classList.remove('fw-bold');
      linkElement.classList.add('fw-normal');
    };

    postElement.appendChild(linkElement);
    postElement.appendChild(buttonElement);
    listElement.appendChild(postElement);
  });
};

export default renderPosts;
