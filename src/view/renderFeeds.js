import removeAllChildNodes from '../utils/removeAllChildNodes.js';

const renderFeeds = (feeds, i18nextInstance) => {
  const feedsElement = document.querySelector('.feeds');
  removeAllChildNodes(feedsElement);

  const headingElement = document.createElement('h2');
  headingElement.textContent = i18nextInstance.t('feeds.title');
  
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

export default renderFeeds;