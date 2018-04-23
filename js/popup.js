'use strict';

(function () {

  var playAreaElement = document.querySelector('header');
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var usernameInputElement = setupElement.querySelector('.setup-user-name');

  var mainWizardCoatElement = setupElement.querySelector('.wizard-coat');
  var mainWizardEyesElement = setupElement.querySelector('.wizard-eyes');
  var mainWizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');

  var playAreaLimits = {
    TOP: 0,
    RIGHT: playAreaElement.offsetWidth,
    BOTTOM: playAreaElement.offsetHeight,
    LEFT: 0
  };

  var POPUP_X_COORD_CORRECTION = 400;

  var popupEscClickHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  var popupCloseKeyDownHandler = function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  };

  var popupCloseClickHandler = function () {
    closePopup();
  };

  // open popup handlers
  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  // username input focus handlers
  usernameInputElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', popupEscClickHandler);
  });

  usernameInputElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', popupEscClickHandler);
  });

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    setupCloseElement.addEventListener('click', popupCloseClickHandler);
    setupCloseElement.addEventListener('keydown', popupCloseKeyDownHandler);

    mainWizardEyesElement.addEventListener('click', window.setup.mainWizardEyesClickHandler);
    mainWizardCoatElement.addEventListener('click', window.setup.mainWizardCoatClickHandler);
    mainWizardFireballElement.addEventListener('click', window.setup.mainWizardFireballClickHandler);

    document.addEventListener('keydown', popupEscClickHandler);
  };

  var closePopup = function () {
    setupElement.classList.add('hidden');
    setupElement.removeAttribute('style');

    setupCloseElement.removeEventListener('click', popupCloseClickHandler);
    setupCloseElement.removeEventListener('keydown', popupCloseKeyDownHandler);

    mainWizardEyesElement.removeEventListener('click', window.setup.mainWizardEyesClickHandler);
    mainWizardCoatElement.removeEventListener('click', window.setup.mainWizardCoatClickHandler);
    mainWizardFireballElement.removeEventListener('click', window.setup.mainWizardFireballClickHandler);

    document.removeEventListener('keydown', popupEscClickHandler);
  };

  var popupHandle = setupElement.querySelector('.upload');

  popupHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var shiftedPopupPosition = {
        top: setupElement.offsetTop - shift.y,
        left: setupElement.offsetLeft - shift.x,
        correctedLeft: setupElement.offsetLeft - shift.x - POPUP_X_COORD_CORRECTION,
        correctedRight: setupElement.offsetLeft + setupElement.offsetWidth - POPUP_X_COORD_CORRECTION
      };

      if (shift.x !== 0 && shift.y !== 0) {
        dragged = true;

        // vertical move

        if (shiftedPopupPosition.top > playAreaLimits.BOTTOM) {
          setupElement.style.top = playAreaLimits.BOTTOM + 'px';
        } else if (shiftedPopupPosition.top < playAreaLimits.TOP) {
          setupElement.style.top = playAreaLimits.TOP + 'px';
        } else {
          setupElement.style.top = shiftedPopupPosition.top + 'px';
        }

        // horizontal move
        if (shiftedPopupPosition.correctedRight > playAreaLimits.RIGHT) {
          setupElement.style.left = playAreaLimits.RIGHT - POPUP_X_COORD_CORRECTION + 'px';
        } else if (shiftedPopupPosition.correctedLeft < playAreaLimits.LEFT) {
          setupElement.style.left = playAreaLimits.LEFT + POPUP_X_COORD_CORRECTION + 'px';
        } else {
          setupElement.style.left = shiftedPopupPosition.left + 'px';
        }

      }

    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (dragged) {
        var clickPreventDefaultHandler = function (clickEvt) {
          clickEvt.preventDefault();
          popupHandle.removeEventListener('click', clickPreventDefaultHandler);
        };
        popupHandle.addEventListener('click', clickPreventDefaultHandler);
      }

    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  });

})();
