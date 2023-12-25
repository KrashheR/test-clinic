document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  var nav = document.querySelector('.navigation');

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('hamburger_active');
    nav.classList.toggle('navigation_active');
  });
});