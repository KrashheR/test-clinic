  const showDialogBtn = document.querySelectorAll('button');
  const myDialog = document.querySelector('#modal');


  showDialogBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      myDialog.showModal();
    });
  })

