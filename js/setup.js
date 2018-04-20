'use strict';

(function () {

// Main wizard
var mainWizardElement = document.querySelector('.setup-wizard');
var mainWizardCoatElement = mainWizardElement.querySelector('.wizard-coat');
var mainWizardCoatInputElement = document.querySelector('input[name="coat-color"]');
var mainWizardEyesElement = mainWizardElement.querySelector('.wizard-eyes');
var mainWizardEyesInputElement = document.querySelector('input[name="eyes-color"]');
var mainWizardFireballElement = document.querySelector('.setup-fireball-wrap');
var mainWizardFireballInputElement = document.querySelector('input[name="fireball-color"]');

// Similar wizards
var similarWizardsElement = document.querySelector('.setup-similar');
var similarListElement = similarWizardsElement.querySelector('.setup-similar-list');

var getWizardName = function () {
  return window.utils.getRandomElement(window.WizardConsts.NAMES) + ' ' + window.utils.getRandomElement(window.WizardConsts.LAST_NAMES);
};

var generateWizards = function (number) {
  var wizards = [];
  for (var i = 0, max = number; i < max; i++) {
    wizards.push({
      'name': getWizardName(),
      'coatColor': window.utils.getRandomElement(window.WizardConsts.COAT_COLOR),
      'eyesColor': window.utils.getRandomElement(window.WizardConsts.EYES_COLOR)
    });
  }

  return wizards;
};

var generatedWizards = generateWizards(window.WizardConsts.QUANTITY);

var renderWizard = function (wizard) {
  var wizardTemplateElement = document.querySelector('#similar-wizard-template').content;
  var clonedWizard = wizardTemplateElement.cloneNode(true);
  clonedWizard.querySelector('.setup-similar-label').textContent = wizard.name;
  clonedWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  clonedWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return clonedWizard;
};

var makeWizardsFragment = function () {
  var wizardsFragment = document.createDocumentFragment();
  for (var i = 0, max = generatedWizards.length; i < max; i++) {
    wizardsFragment.appendChild(renderWizard(generatedWizards[i]));
  }
  return wizardsFragment;
};

var renderedWizards = makeWizardsFragment();

var showWizards = function (fragment) {
  similarListElement.appendChild(fragment);
  similarWizardsElement.classList.remove('hidden');
};

showWizards(renderedWizards);

var mainWizardCoatClickHandler = function () {
  var randomCoatColor = getRandomElement(WizardConsts.COAT_COLOR);
  mainWizardCoatElement.style.fill = randomCoatColor;
  mainWizardCoatInputElement.value = randomCoatColor;
};

var mainWizardEyesClickHandler = function () {
  var randomEyesColor = getRandomElement(WizardConsts.EYES_COLOR);
  mainWizardEyesElement.style.fill = randomEyesColor;
  mainWizardEyesInputElement.value = randomEyesColor;
};

var mainWizardEyesClickHandler = function () {
  var randomEyesColor = getRandomElement(WizardConsts.EYES_COLOR);
  mainWizardEyesElement.style.fill = randomEyesColor;
  mainWizardEyesInputElement.value = randomEyesColor;
};

var mainWizardFireballClickHandler = function () {
  var randomFireballColor = getRandomElement(WizardConsts.FIREBALL_COLOR);
  mainWizardFireballElement.style.backgroundColor = randomFireballColor;
  mainWizardFireballInputElement.value = randomFireballColor;
};

var isPopupOpen = window.popup.isOpen();

if (isPopupOpen) {
  mainWizardEyesElement.addEventListener('click', mainWizardEyesClickHandler);
  mainWizardCoatElement.addEventListener('click', mainWizardCoatClickHandler);
  mainWizardFireballElement.addEventListener('click', mainWizardFireballClickHandler);
} else {
  mainWizardEyesElement.removeEventListener('click', mainWizardEyesClickHandler);
  mainWizardCoatElement.removeEventListener('click', mainWizardCoatClickHandler);
  mainWizardFireballElement.removeEventListener('click', mainWizardFireballClickHandler);
}

})();
