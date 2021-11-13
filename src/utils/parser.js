const errorMessage = 'invalidFormat';
const getContent = (container, selector, isRequired = true) => {
  const element = container.querySelector(selector);
  if (isRequired && !element) {
    throw new Error(errorMessage);
  }
  return element ? element.textContent : '';
};

const getFormat = (xml) => {
  if (xml.querySelector('rss')) {
    return 'rss';
  }
  if (xml.querySelector('feed')) {
    return 'atom';
  }
  return null;
};

const selectors = {
  rss: {
    titleSelector: 'title',
    feedDescriptionSelector: 'description',
    itemSelector: 'item',
    itemDescriptionSelector: 'description',
    pubDateSelector: 'pubDate',
    urlSelector: 'link',
  },
  atom: {
    titleSelector: 'title',
    feedDescriptionSelector: 'subtitle',
    itemSelector: 'entry',
    itemDescriptionSelector: 'summary',
    pubDateSelector: 'updated',
    urlSelector: 'link',
  },
};

const parseFeed = (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'application/xml');
  const format = getFormat(doc);
  if (format === null) {
    throw new Error(errorMessage);
  }

  const {
    titleSelector,
    feedDescriptionSelector,
    itemSelector,
    itemDescriptionSelector,
    pubDateSelector,
    urlSelector,
  } = selectors[format];

  const title = getContent(doc, titleSelector);
  const description = getContent(doc, feedDescriptionSelector, false);
  const items = doc.querySelectorAll(itemSelector);

  const posts = Array.from(items).reduce(
    (acc, item) => [
      ...acc,
      {
        title: getContent(item, titleSelector),
        url: getContent(item, urlSelector),
        description: getContent(item, itemDescriptionSelector, false),
        pubDate: new Date(getContent(item, pubDateSelector)),
      },
    ],
    [],
  );
  return { title, description, posts };
};

export default (data) => {
  try {
    return parseFeed(data);
  } catch {
    throw new Error(errorMessage);
  }
};
