'use strict';

(function () {

  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var getRandomNumber = function (max) {
    return Math.round(Math.random() * max);
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumber(arr.length - 1)];
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

  var colorize = function (element, colors) {
    element.addEventListener('click', function () {
      var color = window.utils.getRandomElement(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    })
  };

  console.log('utils');

  window.utils = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    colorize: colorize
  }

})();
