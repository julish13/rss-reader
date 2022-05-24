/* eslint-disable no-param-reassign */

const removeFeedHandler = (e, watchedState) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }
  const removedFeedId = e.target.dataset.id;
  const currentFeeds = watchedState.data.feeds;
  const currentPosts = watchedState.data.posts;
  watchedState.data.feeds = currentFeeds.filter(
    ({ id }) => id !== removedFeedId,
  );
  watchedState.data.posts = currentPosts.filter(
    ({ feedId }) => feedId !== removedFeedId,
  );
};

export default removeFeedHandler;
