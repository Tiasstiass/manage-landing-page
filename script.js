'use strict';

const hamburgerMenu = document.querySelector('#js-hamburger');
const hamburgerItems = document.querySelector('#js-hamburger-items');
const overlay = document.querySelector('#js-overlay');
const carouselItems = document.querySelectorAll('#js-carousel-items');
const carouselNav = document.querySelectorAll('#js-carousel-nav');
let touchstartX = 0;
let touchendX = 0;

// Hamburger menu open/close //
hamburgerMenu.addEventListener('click', () => {
  if (!hamburgerItems.classList.contains('opened')) {
    overlay.style.display = 'block';
    hamburgerItems.classList.add('opened');
    hamburgerMenu.src = './images/icon-close.svg';
  } else {
    overlay.style.display = 'none';
    hamburgerItems.classList.remove('opened');
    hamburgerMenu.src = './images/icon-hamburger.svg';
  }
});

// Carousel logic //
function resetStyles() {
  for (let item of carouselItems) {
    item.classList.remove('active');
  }
  for (let nav of carouselNav) {
    nav.classList.remove('active');
  }
}

// Swipe events //
carouselItems.forEach((item, i = 0) => {
  function handleGesture() {
    // swipe left
    if (touchendX < touchstartX - 50 && i < carouselItems.length - 1) {
      resetStyles();
      carouselItems[i + 1].classList.add('active');
      carouselNav[i + 1].classList.add('active');
    }
    // swipe right
    if (touchendX > touchstartX + 50 && i > 0) {
      resetStyles();
      carouselItems[i - 1].classList.add('active');
      carouselNav[i - 1].classList.add('active');
    }
  }

  item.addEventListener(
    'touchstart',
    function (e) {
      touchstartX = e.changedTouches[0].screenX;
    },
    false
  );

  item.addEventListener(
    'touchend',
    function (e) {
      touchendX = e.changedTouches[0].screenX;
      handleGesture();
    },
    false
  );
});
