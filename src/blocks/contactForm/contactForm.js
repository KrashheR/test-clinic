document.addEventListener('DOMContentLoaded', function() {
  const showDialogBtn = document.querySelectorAll(".button_сontactForm");
  const contactForm = document.querySelector('.contactForm');
  const contactFormDialog = document.querySelector('#contactFormDialog');
  const confirmationDialog = document.querySelector('#confirmationDialog');

  showDialogBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      contactFormDialog.showModal();
    });
  });

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(() => {
      contactFormDialog.close();
      confirmationDialog.showModal();
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
  });

});