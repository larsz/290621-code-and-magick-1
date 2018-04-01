'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_OFFSET = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var LEGEND_GAP = 20;
var BASE_FONT = 'PT Mono 16px';
var FONT_COLOR = '#000';
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var BAR_GAP = 50;
var YOUR_BAR_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, color, font) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0, max = arr.length; i < max; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return Math.round(maxElement);
};

var getRandomBarColor = function () {
  return 'rgba(0, 0, 255,' + (Math.random()).toFixed(2) + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_OFFSET, CLOUD_Y + CLOUD_OFFSET, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  renderText(ctx, 'Ура, вы победили!', CLOUD_X + LEGEND_GAP, CLOUD_Y + CLOUD_OFFSET + LEGEND_GAP, FONT_COLOR, BASE_FONT);
  renderText(ctx, 'Список результатов:', CLOUD_X + LEGEND_GAP, CLOUD_Y + CLOUD_OFFSET + LEGEND_GAP * 2, FONT_COLOR, BASE_FONT);

  var maxTime = getMaxElement(times);

  for (var i = 0, max = times.length; i < max; i++) {
    var barHeight = Math.round(times[i] * (MAX_BAR_HEIGHT / maxTime));
    var barX = CLOUD_X + LEGEND_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = (CLOUD_HEIGHT - LEGEND_GAP) - barHeight;
    var barColor = getRandomBarColor();

    if (names[i] === 'Вы') {
      barColor = YOUR_BAR_COLOR;
    }

    // bars
    renderBar(ctx, barX, barY, BAR_WIDTH, barHeight, barColor);

    // player names
    renderText(ctx, names[i], barX, barY + barHeight + LEGEND_GAP, FONT_COLOR);

    // player times
    renderText(ctx, Math.round(times[i]), barX, barY - CLOUD_OFFSET, FONT_COLOR);

  }
};
