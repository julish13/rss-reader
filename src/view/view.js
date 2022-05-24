import onChange from 'on-change';
import renderPosts from './renderPosts.js';
import renderFeeds from './renderFeeds.js';
import renderForm from './renderForm.js';
import renderSuccessMessage from './renderSuccessMessage.js';
import renderErrorMessage from './renderErrorMessage.js';
import renderHeader from './renderHeader.js';

const initWatchedState = (i18nextInstance, state) => onChange(state, (path, value) => {
  switch (path) {
    case 'form.processState':
      renderForm(value, i18nextInstance);
      break;
    case 'form.feedback.error':
      renderErrorMessage(value, i18nextInstance);
      break;
    case 'form.feedback.success':
      renderSuccessMessage(value, i18nextInstance);
      break;
    case 'data.feeds':
      renderFeeds(value, i18nextInstance);
      localStorage.setItem('feeds', JSON.stringify(value));
      break;
    case 'data.posts':
      renderPosts(value, i18nextInstance);
      localStorage.setItem('posts', JSON.stringify(value));
      break;
    case 'language':
      renderFeeds(state.data.feeds, i18nextInstance);
      renderPosts(state.data.posts, i18nextInstance);
      renderForm(state.form.processState, i18nextInstance);
      renderHeader(state, i18nextInstance);
      if (state.form.feedback.error) {
        renderErrorMessage(state.form.feedback.error, i18nextInstance);
      }
      if (state.form.feedback.success) {
        renderSuccessMessage(state.form.feedback.success, i18nextInstance);
      }
      localStorage.setItem('language', value);
      break;
    default:
      break;
  }
});

export default initWatchedState;
