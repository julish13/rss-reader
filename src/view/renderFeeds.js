import removeAllChildNodes from '../utils/removeAllChildNodes.js';

const renderFeeds = (feeds, i18nextInstance) => {
  const feedsElement = document.querySelector('.feeds');
  removeAllChildNodes(feedsElement);

  if (feeds.length === 0) {
    return;
  }

  const headingElement = document.createElement('h2');
  headingElement.textContent = i18nextInstance.t('feeds.title');

  const listElement = document.createElement('ul');
  listElement.classList.add('list-group', 'mb-5');

  feedsElement.appendChild(headingElement);
  feedsElement.appendChild(listElement);

  feeds.forEach(({ title, description, id }) => {
    const feedElement = document.createElement('li');
    feedElement.classList.add('list-group-item');

    const deleteButton = Object.assign(document.createElement('button'), {
      className: 'btn btn-close ms-auto d-block',
      ariaLabel: i18nextInstance.t('feeds.delete'),
    });
    deleteButton.dataset.id = id;

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    feedElement.appendChild(deleteButton);
    feedElement.appendChild(titleElement);
    feedElement.appendChild(descriptionElement);
    listElement.appendChild(feedElement);
  });
};

export default renderFeeds;
