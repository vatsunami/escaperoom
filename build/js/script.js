'use strict';

(function () {
  window.resizeInterval = 500;

  window.breakpointWidth = {
    DESKTOP: 1024,
    TABLET: 768,
    MOBILE: 320
  };
})();


(function headerMenu () {
  let pageHeader = document.querySelector(".page-header");

  if (pageHeader) {
    let body = document.body;
    let container = pageHeader.querySelector(".page-header__container");
    let menuButton = container.querySelector(".menu-button");
    let menu = container.querySelector(".menu");
    let mainNav = menu.querySelector(".main-nav");
    let telNumber = menu.querySelector(".tel");
    let location = menu.querySelector(".location");
    let social = document.querySelector(".social");
    let question = document.querySelector(".question");

    function openMenu () {
      body.classList.add("noscroll--header-menu");
      container.classList.remove("page-header__container--closed");
      menu.classList.remove("menu--closed");
      menuButton.classList.remove("menu-button--closed");
      mainNav.classList.remove("main-nav--closed");
      telNumber.classList.remove("tel--closed");
      location.classList.remove("location--closed");

      if (social) {
        social.classList.add("social--show");
      }

      if (question) {
        question.classList.add("question--show");
      }
    };

    function closeMenu () {
      body.classList.remove("noscroll--header-menu");
      container.classList.add("page-header__container--closed");
      menu.classList.add("menu--closed");
      menuButton.classList.add("menu-button--closed");
      mainNav.classList.add("main-nav--closed");
      telNumber.classList.add("tel--closed");
      location.classList.add("location--closed");

      if (social) {
        social.classList.remove("social--show");
      }

      if (question) {
        question.classList.remove("question--show");
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
  let modal = document.querySelector(".modal-city");

  if (modal) {
    let container = modal.querySelector(".modal-city__container");
    let buttonOpen = document.querySelector(".menu__location");
    let buttonClose = modal.querySelector(".modal__button-close");

    function showModal () {
      modal.classList.remove("modal--closed");
      buttonClose.focus();
      buttonOpen.removeEventListener("click", onButtonOpenClick);
      buttonClose.addEventListener("click", onButtonCloseClick);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    function hideModal () {
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


(function modalQustion () {
  let ESC_KEYCODE = 27;
  let modal = document.querySelector(".modal-question");

  if (modal) {
    let container = modal.querySelector(".modal-question__container");
    let buttonOpen = document.querySelector(".question");
    let buttonClose = modal.querySelector(".modal__button-close");

    function showModal () {
      modal.classList.remove("modal--closed");
      buttonClose.focus();
      buttonOpen.removeEventListener("click", onButtonOpenClick);
      buttonClose.addEventListener("click", onButtonCloseClick);
      modal.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    function hideModal () {
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
