'use strict';

(function () {

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

})();
