'use strict';

(function () {
  window.resizeInterval = 500;

  window.breakpointWidth = {
    DESKTOP: 1024,
    TABLET: 768,
    MOBILE: 320
  };
})();


(function headerMenu() {
  var pageHeader = document.querySelector('.page-header');

  if (pageHeader) {
    var container = pageHeader.querySelector('.page-header__container');
    var menuButton = container.querySelector('.menu-button');
    var menu = container.querySelector('.menu');
    var mainNav = menu.querySelector('.main-nav');
    var telNumber = menu.querySelector('.tel');
    var location = menu.querySelector('.location');
    var pageFooter = document.querySelector('.page-footer');

    var openMenu = function () {
      document.body.classList.add('noscroll--header-menu');
      pageHeader.classList.add('page-header--opened');
      container.classList.add('page-header__container--opened');
      container.classList.remove('page-header__container--closed');
      menu.classList.add('menu--opened');
      menu.classList.remove('menu--closed');
      menuButton.classList.remove('menu-button--closed');
      mainNav.classList.remove('main-nav--closed');
      telNumber.classList.remove('tel--closed');
      location.classList.remove('location--closed');

      if (pageFooter) {
        pageFooter.classList.add('page-footer--show');
      }
    };

    var closeMenu = function () {
      document.body.classList.remove('noscroll--header-menu');
      pageHeader.classList.remove('page-header--opened');
      container.classList.remove('page-header__container--opened');
      container.classList.add('page-header__container--closed');
      menu.classList.remove('menu--opened');
      menu.classList.add('menu--closed');
      menuButton.classList.add('menu-button--closed');
      mainNav.classList.add('main-nav--closed');
      telNumber.classList.add('tel--closed');
      location.classList.add('location--closed');

      if (pageFooter) {
        pageFooter.classList.remove('page-footer--show');
      }
    };

    menuButton.addEventListener('click', function () {
      if (menu.classList.contains('menu--closed')) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    window.addEventListener('load', function () {
      closeMenu();
    });

    window.addEventListener('resize', function () {
      var resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          if (window.innerWidth >= window.breakpointWidth.DESKTOP) {
            closeMenu();
          }
        }, window.resizeInterval);
      }
    });
  }

})();


(function modalCity() {
  var ESC_KEYCODE = 27;
  var pageHeader = document.querySelector('.page-header');
  var modal = document.querySelector('.modal-city');

  if (modal) {
    var container = modal.querySelector('.modal-city__container');
    var buttonOpen = document.querySelector('.menu__location');
    var buttonClose = modal.querySelector('.modal__button-close');

    var showModal = function () {
      document.body.classList.add('noscroll--modal-city');
      modal.classList.remove('modal--closed');
      pageHeader.classList.add('page-header--modal-opened');
      buttonClose.focus();
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    var hideModal = function () {
      document.body.classList.remove('noscroll--modal-city');
      modal.classList.add('modal--closed');
      pageHeader.classList.remove('page-header--modal-opened');
      buttonOpen.focus();
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      modal.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var onOverlayClick = function (evt) {
      var clickCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      if (clickCoordinates.x < container.offsetLeft ||
        clickCoordinates.x > container.offsetLeft + container.offsetWidth ||
        clickCoordinates.y < container.offsetTop ||
        clickCoordinates.y > container.offsetTop + container.offsetHeight) {
        hideModal();
      }
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideModal();
      }
    };

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showModal();
    };

    var onButtonCloseClick = function (evt) {
      evt.preventDefault();
      hideModal();
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
  }
})();


(function modalQuestion() {
  var ESC_KEYCODE = 27;
  var modal = document.querySelector('.modal-question');

  if (modal) {
    var pageHeader = document.querySelector('.page-header');
    var container = modal.querySelector('.modal-question__container');
    var buttonOpen = document.querySelector('.question');
    var buttonClose = modal.querySelector('.modal__button-close');

    var showModal = function () {
      document.body.classList.add('noscroll--modal-question');
      pageHeader.classList.add('page-header--modal-opened');
      modal.classList.remove('modal--closed');
      buttonClose.focus();
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    var hideModal = function () {
      document.body.classList.remove('noscroll--modal-question');
      pageHeader.classList.remove('page-header--modal-opened');
      modal.classList.add('modal--closed');
      buttonOpen.focus();
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      modal.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var onOverlayClick = function (evt) {
      var clickCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      if (clickCoordinates.x < container.offsetLeft ||
        clickCoordinates.x > container.offsetLeft + container.offsetWidth ||
        clickCoordinates.y < container.offsetTop ||
        clickCoordinates.y > container.offsetTop + container.offsetHeight) {
        hideModal();
      }
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideModal();
      }
    };

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showModal();
    };

    var onButtonCloseClick = function (evt) {
      evt.preventDefault();
      hideModal();
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
  }
})();
