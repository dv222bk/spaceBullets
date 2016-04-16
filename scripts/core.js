"use strict";

var SPACEBULLETS = SPACEBULLETS || {};

SPACEBULLETS.GameCore = function() {
  var graphicsDevice, draw2D, updateFunctions, drawObjects,
  drawAdditiveObjects

  TurbulenzEngine.onerror = function gameErrorFn(msg) {
    // Handle the error, using msg to inform the developer
    // what went wrong.

    window.alert(msg);
  };

  graphicsDevice = TurbulenzEngine.createGraphicsDevice({});

  draw2D = Draw2D.create({
    graphicsDevice: graphicsDevice
  });

  // Static objects
  drawObjects = [];

  // Objects that need to move in some way
  drawAdditiveObjects = [];

  this.getGraphicsDevice = function() {
    return graphicsDevice;
  };

  this.getDraw2D = function() {
    return draw2D;
  };

  this.saveDrawObject = function(drawObject) {
    drawObjects.push(drawObject);
  };

  this.getDrawObjects = function() {
    return drawObjects;
  };

  this.saveDrawAdditiveObjects = function(drawAdditiveObject) {
    drawAdditiveObjects.push(drawAdditiveObject);
  };

  this.getDrawAdditiveObjects = function() {
    return drawAdditiveObjects;
  };

  // Sequence
  this.generatePlayFieldDrawObjects();

  // Update
  function update() {
    var bgColor, drawObject;

    bgColor = [1.0, 1.0, 0.0, 1.0];

    if(graphicsDevice.beginFrame()) {
      graphicsDevice.clear(bgColor, 1.0);

      /* Rendering code */
      if(drawObjects.length > 0) {
        draw2D.begin();
        for(drawObject = 0; drawObject < drawObjects.length; drawObject += 1) {
          draw2D.draw(drawObjects[drawObject]);
        }
        draw2D.end();
      }

      if(drawAdditiveObjects.length > 0) {
        draw2D.begin('additive');
        for(drawObject = 0; drawObject < drawAdditiveObjects.length; drawObject += 1) {
          draw2D.draw(drawAdditiveObjects[drawObject]);
        }
        draw2D.end();
      }

      graphicsDevice.endFrame();
    }
  }

  TurbulenzEngine.setInterval(update, 1000 / 60);
};

SPACEBULLETS.GameCore.prototype.generatePlayFieldDrawObjects = function() {
  var graphicsDevice, playField, menu, drawPlayField, drawMenu;

  graphicsDevice = this.getGraphicsDevice();

  playField = [
    0,
    0,
    graphicsDevice.width * 0.75,
    graphicsDevice.height
  ];

  menu = [
    graphicsDevice.width * 0.75,
    0,
    graphicsDevice.width,
    graphicsDevice.height
  ];

  drawPlayField = {
    color: [1.0, 0.0, 0.0, 1.0],
    destinationRectangle: playField
  };

  drawMenu = {
    color: [0.0, 1.0, 0.0, 1.0],
    destinationRectangle: menu
  };

  this.saveDrawObject(drawPlayField);
  this.saveDrawObject(drawMenu);
}

window.onload = function() {
	new SPACEBULLETS.GameCore();
};
