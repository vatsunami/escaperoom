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
    var buttonClose = container.querySelector('.modal__button-close');
    var overlay = document.querySelector('.overlay');

    var showModal = function () {
      document.body.classList.add('noscroll--modal-city');
      modal.classList.remove('modal--closed');
      pageHeader.classList.add('page-header--modal-opened');
      overlay.classList.remove('overlay--hidden');
      buttonClose.focus();
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      overlay.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    var hideModal = function () {
      document.body.classList.remove('noscroll--modal-city');
      modal.classList.add('modal--closed');
      pageHeader.classList.remove('page-header--modal-opened');
      overlay.classList.add('overlay--hidden');
      buttonOpen.focus();
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      overlay.addEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var onOverlayClick = function () {
      hideModal();
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
    var buttonClose = container.querySelector('.modal__button-close');
    var overlay = document.querySelector('.overlay');

    var form = container.querySelector('.form');
    var username = form.querySelector('[id=username]');
    var email = form.querySelector('[id=email]');
    var message = form.querySelector('[id=message]');
    var buttonSubmit = form.querySelector('.form__button');
    var eula = form.querySelector('[id=eula]');

    var isStorageSupport = true;
    var storage = '';

    try {
      storage = localStorage.getItem('username');
    } catch (err) {
      isStorageSupport = false;
    }

    var showModal = function () {
      document.body.classList.add('noscroll--modal-question');
      pageHeader.classList.add('page-header--modal-opened');
      modal.classList.remove('modal--closed');
      overlay.classList.remove('overlay--hidden');
      username.focus();
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      overlay.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);

      if (isStorageSupport && storage) {
        username.value = localStorage.getItem('username');
        email.value = localStorage.getItem('email');
        message.focus();
      }

      switchFieldStatusByValidity(username, isUsernameValid());
      switchFieldStatusByValidity(email, isEmailValid());
    };

    var hideModal = function () {
      document.body.classList.remove('noscroll--modal-question');
      pageHeader.classList.remove('page-header--modal-opened');
      modal.classList.add('modal--closed');
      overlay.classList.add('overlay--hidden');
      buttonOpen.focus();
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      overlay.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var markFieldByState = function (field, state) {
      var wrapper = field.parentNode;
      var title = wrapper.querySelector('.form__input-title');
      var error = wrapper.querySelector('.form__input-message-text');

      if (state) {
        wrapper.classList.add('form__input-wrapper--valid');
        wrapper.classList.remove('form__input-wrapper--invalid');
        title.classList.add('form__input-title--visible');
        error.classList.add('form__input-message-text--hidden');
      } else {
        wrapper.classList.remove('form__input-wrapper--valid');
        wrapper.classList.add('form__input-wrapper--invalid');
        title.classList.add('form__input-title--visible');
        error.classList.remove('form__input-message-text--hidden');
      }

      if (field.value === '') {
        wrapper.classList.remove('form__input-wrapper--valid');
        wrapper.classList.remove('form__input-wrapper--invalid');
        title.classList.remove('form__input-title--visible');
        error.classList.add('form__input-message-text--hidden');
      }
    };

    var isUsernameValid = function () {
      if (username.value.length > 2) {
        return true;
      } else {
        return false;
      }
    };

    var isEmailValid = function () {
      if (email.validity.valid) {
        return true;
      } else {
        return false;
      }
    };

    var isAllFormFieldsValid = function () {
      if (isUsernameValid() && isEmailValid() && message.value !== '') {
        return true;
      } else {
        return false;
      }
    };

    var switchButtonSubmitDisabledAttr = function () {
      if (isAllFormFieldsValid() && eula.checked) {
        buttonSubmit.disabled = false;
      } else {
        buttonSubmit.disabled = true;
      }
    };

    var switchFieldStatusByValidity = function (field, isValid) {
      if (isValid) {
        markFieldByState(field, isValid);
      } else {
        markFieldByState(field, isValid);
      }
    };

    var onOverlayClick = function () {
      hideModal();
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

    var onEulaChange = function () {
      switchButtonSubmitDisabledAttr();
    };

    var onUsernameChange = function () {
      switchFieldStatusByValidity(username, isUsernameValid());
      switchButtonSubmitDisabledAttr();
    };

    var onEmailChange = function () {
      switchFieldStatusByValidity(email, isEmailValid());
      switchButtonSubmitDisabledAttr();
    };

    var onMessageChange = function () {
      switchButtonSubmitDisabledAttr();
    };

    var onFormSubmit = function () {
      if (isStorageSupport) {
        localStorage.setItem('username', username.value);
        localStorage.setItem('email', email.value);
      }
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
    username.addEventListener('change', onUsernameChange);
    email.addEventListener('change', onEmailChange);
    message.addEventListener('change', onMessageChange);
    eula.addEventListener('change', onEulaChange);
    form.addEventListener('submit', onFormSubmit);
  }

})();


(function sliderCategories() {
  var slider = document.querySelector('.catalog-category');

  if (slider) {
    var container = slider.querySelector('.catalog-category__container');
    var list = container.querySelector('.catalog-category__list');
    var items = list.querySelectorAll('.catalog-category__item');
    var itemsArray = [].slice.call(items);

    var getTotalItemsWidth = function () {
      var sum = 0;
      itemsArray.forEach(function (item) {
        sum += item.offsetWidth;
      });
      return sum;
    };

    var returnListToStart = function () {
      list.style.left = 0;
    };

    var moveListByX = function (listX) {
      if (listX > container.offsetWidth - list.offsetWidth) {
        listX = container.offsetWidth - list.offsetWidth;
      }
      if (listX < container.offsetWidth - getTotalItemsWidth()) {
        listX = container.offsetWidth - getTotalItemsWidth();
      }
      list.style.left = listX + 'px';
    };


    var onListMouseDown = function (evt) {
      evt.preventDefault();

      var startCoordinateX = evt.clientX;

      var onListMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = startCoordinateX - moveEvt.clientX;
        startCoordinateX = moveEvt.clientX;

        var listX = list.offsetLeft - shift;

        moveListByX(listX);
      };

      var onListMouseUp = function (upEvt) {
        upEvt.preventDefault();
        list.removeEventListener('mousemove', onListMouseMove);
        list.removeEventListener('mouseup', onListMouseUp);
      };

      var onListMouseLeave = function (leaveEvt) {
        leaveEvt.preventDefault();
        list.removeEventListener('mousemove', onListMouseMove);
        list.removeEventListener('mousemup', onListMouseUp);
        list.removeEventListener('mouseleave', onListMouseLeave);
      };

      list.addEventListener('mousemove', onListMouseMove);
      list.addEventListener('mouseup', onListMouseUp);
      list.addEventListener('mouseleave', onListMouseLeave);
    };


    var onListTouchStart = function (evt) {
      var startCoordinateX = evt.touches[0].clientX;

      var onListTouchMove = function (moveEvt) {
        var shift = startCoordinateX - moveEvt.touches[0].clientX;

        startCoordinateX = moveEvt.touches[0].clientX;

        var listX = list.offsetLeft - shift;

        moveListByX(listX);
      };

      var onListTouchEnd = function () {
        list.removeEventListener('touchmove', onListTouchMove, {passive: true});
        list.removeEventListener('touchend', onListTouchEnd, {passive: true});
      };

      list.addEventListener('touchmove', onListTouchMove, {passive: true});
      list.addEventListener('touchend', onListTouchEnd, {passive: true});
    };


    var addListEventListeners = function () {
      list.addEventListener('mousedown', onListMouseDown);
      list.addEventListener('touchstart', onListTouchStart, {passive: true});
    };

    var removeListEventListeners = function () {
      list.removeEventListener('mousedown', onListMouseDown);
      list.removeEventListener('touchstart', onListTouchStart, {passive: true});
    };

    if (container.offsetWidth < getTotalItemsWidth()) {
      addListEventListeners();
    }

    window.addEventListener('resize', function () {
      var resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          removeListEventListeners();
          if (container.offsetWidth < getTotalItemsWidth()) {
            addListEventListeners();
          }
          returnListToStart();
        }, window.resizeInterval);
      }
    });
  }

})();


(function categoryTabs() {
  var categoryList = document.querySelector('.catalog-category__list');

  if (categoryList) {
    var tabs = categoryList.querySelectorAll('.catalog-category__link');
    var tabsArray = [].slice.call(tabs);
    var activeTabIndex = 0;

    tabsArray.forEach(function (element) {
      element.addEventListener('click', function () {
        activeTabIndex = tabsArray.indexOf(element);
        switchActiveTab();
      });
    });

    var switchActiveTab = function () {
      tabsArray.forEach(function (element, index) {
        var text = element.querySelector('.catalog-category__link-text');

        if (index !== activeTabIndex) {
          element.classList.remove('catalog-category__link--active');
          text.classList.remove('catalog-category__link-text--active');
        } else {
          element.classList.add('catalog-category__link--active');
          text.classList.add('catalog-category__link-text--active');
        }
      });
    };
  }
})();
