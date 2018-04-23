'use strict';

(function () {

// Main wizard
  var mainWizardSetupElement = document.querySelector('.setup-player');
  var mainWizardCoatElement = mainWizardSetupElement.querySelector('.wizard-coat');
  var mainWizardCoatInputElement = mainWizardSetupElement.querySelector('input[name="coat-color"]');
  var mainWizardEyesElement = mainWizardSetupElement.querySelector('.wizard-eyes');
  var mainWizardEyesInputElement = mainWizardSetupElement.querySelector('input[name="eyes-color"]');
  var mainWizardFireballElement = mainWizardSetupElement.querySelector('.setup-fireball-wrap');
  var mainWizardFireballInputElement = mainWizardSetupElement.querySelector('input[name="fireball-color"]');

  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactsCellElement = artifactsElement.querySelectorAll('.setup-artifacts-cell');
  var draggedItem = null;

  var ALLOWED_CELL_STYLE = '2px dashed red';
  var HOVERED_CELL_STYLE = 'yellow';

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }

    artifactsCellElement.forEach(function (cell) {
      cell.style.outline = ALLOWED_CELL_STYLE;
    });

  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragstart', function () {
    artifactsCellElement.forEach(function (cell) {
      cell.style.outline = ALLOWED_CELL_STYLE;
    });
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';

    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.appendChild(draggedItem);
    }

    artifactsCellElement.forEach(function (cell) {
      cell.style.outline = '';
    });

  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.style.backgroundColor = HOVERED_CELL_STYLE;
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  document.addEventListener('dragend', function (evt) {
    evt.preventDefault();

    artifactsCellElement.forEach(function (cell) {
      cell.removeAttribute('style');
    });

  });

  var mainWizardCoatClickHandler = function () {
    var randomCoatColor = window.utils.getRandomElement(window.WizardConsts.COAT_COLOR);
    window.utils.colorize(mainWizardCoatElement, randomCoatColor);
    mainWizardCoatInputElement.value = randomCoatColor;
  };

  var mainWizardEyesClickHandler = function () {
    var randomEyesColor = window.utils.getRandomElement(window.WizardConsts.EYES_COLOR);
    window.utils.colorize(mainWizardEyesElement, randomEyesColor);
    mainWizardEyesInputElement.value = randomEyesColor;
  };

  var mainWizardFireballClickHandler = function () {
    var randomFireballColor = window.utils.getRandomElement(window.WizardConsts.FIREBALL_COLOR);
    window.utils.colorize(mainWizardFireballElement, randomFireballColor);
    mainWizardFireballInputElement.value = randomFireballColor;
  };

  window.setup = {
    mainWizardCoatClickHandler: mainWizardCoatClickHandler,
    mainWizardEyesClickHandler: mainWizardEyesClickHandler,
    mainWizardFireballClickHandler: mainWizardFireballClickHandler
  };

})();
