'use strict';

var WizardConsts = {
  NAMES: [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  LAST_NAMES: [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ],
  COAT_COLOR: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  EYES_COLOR: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  QUANTITY: 4
};

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

var getWizardName = function () {
  return getRandomElement(WizardConsts.NAMES) + ' ' + getRandomElement(WizardConsts.LAST_NAMES);
};

var generateWizards = function (number) {
  var wizards = [];
  for (var i = 0, max = number; i < max; i++) {
    wizards.push({
      'name': getWizardName(),
      'coatColor': getRandomElement(WizardConsts.COAT_COLOR),
      'eyesColor': getRandomElement(WizardConsts.EYES_COLOR)
    });
  }

  return wizards;
};

var generatedWizards = generateWizards(WizardConsts.QUANTITY);

var wizardTemplateElement = document.querySelector('#similar-wizard-template').content;
var similarWizardsElement = document.querySelector('.setup-similar');
var similarListElement = similarWizardsElement.querySelector('.setup-similar-list');

var renderWizard = function (wizard) {
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

var showWizards = function () {
  similarListElement.appendChild(renderedWizards);
  similarWizardsElement.classList.remove('hidden');
};

showWizards();

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var usernameInputElement = setupElement.querySelector('.setup-user-name');

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

// handlers
var popupEscClickHandler = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    closePopup();
  }
};

var popupCloseClickHandler = function () {
  closePopup();
};

var popupCloseKeyDownHandler = function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    closePopup();
  }
};

// open popup handlers
setupOpenElement.addEventListener('click', function() {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function(evt){
  if (evt.keyCode === KeyCode.ENTER) {
    openPopup();
  }
});

// username input focus handlers
usernameInputElement.addEventListener('focusin', function() {
  document.removeEventListener('keydown', popupEscClickHandler);
});

usernameInputElement.addEventListener('focusout', function() {
  document.addEventListener('keydown', popupEscClickHandler);
})
