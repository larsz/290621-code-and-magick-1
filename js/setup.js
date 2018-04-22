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
