(function() {
  function createImageHTML(path, image) {
    return `<img src="${path}/${image}"/>`;
  }

  function createModalHTML(data) {
    const {
      title,
      description,
      image,
      images: imageUrls,
      path,
    } = data;

    const images = imageUrls
      .split(',')
      .filter((image) => image !== '')
      .map((image) => createImageHTML(path, image));

    if (image) {
      images.unshift(createImageHTML(path, image));
    }

    return `
      <div class="modal-content">
        <div class="modal-header">
          <div class="title">${title}</div>
          <div class="close"></div>
        </div>
        <div class="modal-body">
          <div class="description">${description}</div>
          <div class="images">${images.join('')}</div>
        </div>
      </div>
    `;
  }

  function createModalElement(data) {
    const element = document.createElement('div');
    const overlay = document.createElement('div');

    element.className = 'modal';
    overlay.className = 'overlay';

    element.innerHTML = createModalHTML(data);

    element.appendChild(overlay);

    return element;
  }

  let currentModal = null;

  function stopEvent(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // Function to clear the current modal
  function clearModal() {
    if (!currentModal) {
      return;
    }

    document.body.classList.remove('modal-open');

    currentModal.parentNode.removeChild(currentModal);
    currentModal = null;
  }

  function showModal(data = {}) {
    clearModal();

    currentModal = createModalElement(data);

    document.body.appendChild(currentModal);
    document.body.classList.add('modal-open');
  }

  function onClick(event) {
    // Check if the element that we clicked on is the overlay element
    const isOverlay = event.target.classList.contains('overlay');
    const isClose = event.target.classList.contains('close');

    // If it was the overlay...
    if (isOverlay || isClose) {
      // Stop the event
      stopEvent(event);
      // Close the current modal
      clearModal();
      // exit the function
      return;
    }

    // Retrieve the first parent HTML card, relative to the element that was clicked on
    const target = event.target.closest('.has-modal');

    // Check if the element clicked on has a card
    if (target) {
      // Stop the event
      stopEvent(event);
      // call showModal passing card.dataset (data-* html attrs) as the only argument
      // star prefix is anything that has data- infront
      // data-* refers to any HTML attribute starting with data-. The * is referred to as a wildcard
      showModal(target.dataset);
    }
  }

  function onLoad() {
    // call onClick function when click event happens
    document.addEventListener('click', onClick);
  }

  // call onLoad function when DOMContentLoaded event happens
  document.addEventListener('DOMContentLoaded', onLoad);
})();
