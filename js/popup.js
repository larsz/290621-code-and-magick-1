'use strict';

(function () {

  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var usernameInputElement = setupElement.querySelector('.setup-user-name');

  var isPopupOpen = function () {
    return !setupElement.classList.contains('hidden');
  };

  var popupEscClickHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup)
  };

  var popupCloseKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closePopup)
  };

  var popupCloseClickHandler = function () {
    closePopup();
  };

  // open popup handlers
  setupOpenElement.addEventListener('click', function() {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function(evt){
    window.utils.isEnterEvent(evt, openPopup)
  });

  // username input focus handlers
  usernameInputElement.addEventListener('focusin', function() {
    document.removeEventListener('keydown', popupEscClickHandler);
  });

  usernameInputElement.addEventListener('focusout', function() {
    document.addEventListener('keydown', popupEscClickHandler);
  })

  var openPopup = function (){
    setupElement.classList.remove('hidden');
    setupCloseElement.addEventListener('click', popupCloseClickHandler);
    setupCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);

    document.addEventListener('keydown', popupEscClickHandler);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    setupCloseElement.removeEventListener('click', popupCloseClickHandler);
    setupCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);

    document.removeEventListener('keydown', popupEscClickHandler);
  };

  window.popup = {
    isOpen: isPopupOpen
  }
})();
