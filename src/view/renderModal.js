const renderModal = ({title, url, description}, i18nextInstance) => {
  const modal = document.querySelector('.modal-content');
  const modalTitle = modal.querySelector('.modal-title');
  const modalBody = modal.querySelector('.modal-body');
  const modalLink = modal.querySelector('.full-article');
  const modalCloseButton = modal.querySelector('.close-modal');

  modalLink.textContent = i18nextInstance.t('modal.read');
  modalCloseButton.textContent = i18nextInstance.t('modal.close');


  modalTitle.textContent = title;
  modalBody.textContent = description;
  modalLink.href = url;
};

export default renderModal;