(function() {
  function make(className, children = []) {
    const node = document.createElement('div');

    node.className = className;

    for (let child of children) {
      node.appendChild(child);
    }

    return node;
  }

  function modal({
    title = '',
    description = '',
    date = '',
    client = '',
    role = '',
    url = '',
  } = {}) {
    return make('modal', [
      make('overlay'),
      make('modal-content', [
        make('modal-header', [
          make('title', [document.createTextNode(title)]),
          make('close'),
        ]),
        make('modal-body', [
          make('description', [document.createTextNode(description)]),
          make('details', [
            make('', [document.createTextNode(`Date: ${date}`)]),
            make('', [document.createTextNode(`Client: ${client}`)]),
            make('', [document.createTextNode(`Role: ${role}`)]),
            make('', [document.createTextNode(`URL: ${url}`)]),
          ]),
        ]),
      ]),
    ]);
  }

  const state = {
    body: document.body,
    isOpen: false,
    modal: null,
  };

  function stop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function clear() {
    if (!state.modal) {
      return;
    }

    document.body.classList.remove('modal-open');

    state.modal.parentNode.removeChild(state.modal);
    state.modal = null;
  }

  function toggle(data) {
    clear();

    state.modal = modal(data);

    document.body.appendChild(state.modal);
    document.body.classList.add('modal-open');
  }

  function click(event) {
    stop(event);

    const isOverlay = event.target.classList.contains('overlay');

    if (isOverlay) {
      clear();
      return;
    }

    const card = event.target.closest('.card');

    if (card && card.dataset) {
      toggle(card.dataset);
    }
  }

  function init() {
    document.addEventListener('click', click);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
