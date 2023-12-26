document.addEventListener('DOMContentLoaded', function() {
  const modals = document.querySelectorAll(".modal");
  const closeModalButtons = document.querySelectorAll('.modal__close-button');

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.close();
      }
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if(event.target.classList.contains('modal')) {
        modal.close();
      }
    });
  });
});
