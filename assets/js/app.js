(function() {
  const body = document.body;

  function stop(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function toggle(modal) {
    const isOpen = modal.classList.contains('open');

    modal.classList.toggle('open', !isOpen);
    body.classList.toggle('modal-open', !isOpen);
  }

  function click(event) {
    stop(event);

    const card = event.target.closest('.card');
    const modal = card.querySelector('.modal');

    toggle(modal);
  }

  function init() {
    const nodes = document.querySelectorAll('.card');
    const cards = Array.from(nodes);

    for (let card of cards) {
      card.addEventListener('click', click);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
