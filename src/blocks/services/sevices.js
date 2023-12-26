document.addEventListener('DOMContentLoaded', function() {
  const contents = document.querySelectorAll('.services-card__content');
  const pictures = document.querySelectorAll('.services-card__picture');

  const navLeftButton = document.querySelector('.services__nav-button_left');
  const navRightButton = document.querySelector('.services__nav-button_right');

  const currentCardIndicator = document.querySelector('.services__card-current');
  const totalCardsIndicator = document.querySelector('.services__card-total');
  totalCardsIndicator.textContent = `/${contents.length}`;

  let currentIndex = 0;
  let previousIndex = -1;

  function updateCardVisibility() {
    if (previousIndex >= 0) {
      contents[previousIndex].classList.remove("services-card__content_active");
      pictures[previousIndex].classList.remove("services-card__picture_active");
    }

    contents[currentIndex].classList.add("services-card__content_active");
    pictures[currentIndex].classList.add("services-card__picture_active");
    currentCardIndicator.textContent = currentIndex + 1;
  }

  function changeCard(newIndex) {
    if (newIndex >= 0 && newIndex < contents.length) {
      previousIndex = currentIndex;
      currentIndex = newIndex;
      updateCardVisibility();
    }
  }

  navLeftButton.addEventListener('click', () => changeCard(currentIndex - 1));
  navRightButton.addEventListener('click', () => changeCard(currentIndex + 1));

  updateCardVisibility();
});
