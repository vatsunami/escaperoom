'use strict';

(function () {
  window.resizeInterval = 500;

  window.breakpointWidth = {
    DESKTOP: 1024,
    TABLET: 768,
    MOBILE: 320
  };
})();

document.querySelector(".page-inner").classList.add("page-inner--active-js");


(function headerMenu () {
  let pageHeader = document.querySelector(".page-header");

  if (pageHeader) {
    let container = pageHeader.querySelector(".page-header__container");
    let menuButton = container.querySelector(".menu-button");
    let menu = container.querySelector(".menu");
    let mainNav = menu.querySelector(".main-nav");
    let telNumber = menu.querySelector(".tel");
    let location = menu.querySelector(".location");
    let pageFooter = document.querySelector(".page-footer");

    function openMenu () {
      document.body.classList.add("noscroll--header-menu");
      pageHeader.classList.add("page-header--opened");
      container.classList.add("page-header__container--opened");
      container.classList.remove("page-header__container--closed");
      menu.classList.add("menu--opened");
      menu.classList.remove("menu--closed");
      menuButton.classList.remove("menu-button--closed");
      mainNav.classList.remove("main-nav--closed");
      telNumber.classList.remove("tel--closed");
      location.classList.remove("location--closed");

      if (pageFooter) {
        pageFooter.classList.add("page-footer--show");
      }
    };

    function closeMenu () {
      document.body.classList.remove("noscroll--header-menu");
      pageHeader.classList.remove("page-header--opened");
      container.classList.remove("page-header__container--opened");
      container.classList.add("page-header__container--closed");
      menu.classList.remove("menu--opened");
      menu.classList.add("menu--closed");
      menuButton.classList.add("menu-button--closed");
      mainNav.classList.add("main-nav--closed");
      telNumber.classList.add("tel--closed");
      location.classList.add("location--closed");

      if (pageFooter) {
        pageFooter.classList.remove("page-footer--show");
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
      let resizeTimeout;
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


(function modalCity () {
  let ESC_KEYCODE = 27;
  let pageHeader = document.querySelector(".page-header");
  let modal = document.querySelector(".modal-city");

  if (modal) {
    let container = modal.querySelector(".modal-city__container");
    let buttonOpen = document.querySelector(".menu__location");
    let buttonClose = modal.querySelector(".modal__button-close");

    function showModal () {
      document.body.classList.add("noscroll--modal-city");
      modal.classList.remove("modal--closed");
      pageHeader.classList.add("page-header--modal-opened");
      buttonClose.focus();
      buttonOpen.removeEventListener("click", onButtonOpenClick);
      buttonClose.addEventListener("click", onButtonCloseClick);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    function hideModal () {
      document.body.classList.remove("noscroll--modal-city");
      modal.classList.add("modal--closed");
      pageHeader.classList.remove("page-header--modal-opened");
      buttonOpen.focus();
      buttonOpen.addEventListener("click", onButtonOpenClick);
      buttonClose.removeEventListener("click", onButtonCloseClick);
      modal.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    let onOverlayClick = function (evt) {
      let clickCoordinates = {
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

    let onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideModal();
      }
    };

    function onButtonOpenClick (evt) {
      evt.preventDefault();
      showModal()
    };

    function onButtonCloseClick (evt) {
      evt.preventDefault();
      hideModal();
    };

    buttonOpen.addEventListener("click", onButtonOpenClick);
  }
})();


(function modalQustion () {
  let ESC_KEYCODE = 27;
  let modal = document.querySelector(".modal-question");

  if (modal) {
    let pageHeader = document.querySelector(".page-header");
    let container = modal.querySelector(".modal-question__container");
    let buttonOpen = document.querySelector(".question");
    let buttonClose = modal.querySelector(".modal__button-close");

    function showModal () {
      document.body.classList.add("noscroll--modal-question");
      pageHeader.classList.add("page-header--modal-opened");
      modal.classList.remove("modal--closed");
      buttonClose.focus();
      buttonOpen.removeEventListener("click", onButtonOpenClick);
      buttonClose.addEventListener("click", onButtonCloseClick);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    function hideModal () {
      document.body.classList.remove("noscroll--modal-question");
      pageHeader.classList.remove("page-header--modal-opened");
      modal.classList.add("modal--closed");
      buttonOpen.focus();
      buttonOpen.addEventListener("click", onButtonOpenClick);
      buttonClose.removeEventListener("click", onButtonCloseClick);
      modal.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    let onOverlayClick = function (evt) {
      let clickCoordinates = {
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

    let onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideModal();
      }
    };

    function onButtonOpenClick (evt) {
      evt.preventDefault();
      showModal()
      console.log("click");
    };

    function onButtonCloseClick (evt) {
      evt.preventDefault();
      hideModal();
    };

    buttonOpen.addEventListener("click", onButtonOpenClick);
  }
})();
