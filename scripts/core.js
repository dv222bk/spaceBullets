"use strict";

var SPACEBULLETS = SPACEBULLETS || {};

SPACEBULLETS.GameCore = function() {
  var graphicsDevice, draw2D, updateFunctions, player,
  entityList, utilities;

  TurbulenzEngine.onerror = function gameErrorFn(msg) {
    // Handle the error, using msg to inform the developer
    // what went wrong.

    window.alert(msg);
  };

  graphicsDevice = TurbulenzEngine.createGraphicsDevice({});

  draw2D = Draw2D.create({
    graphicsDevice: graphicsDevice
  });

  this.getGraphicsDevice = function() {
    return graphicsDevice;
  };

  this.getDraw2D = function() {
    return draw2D;
  };

  this.getPlayer = function() {
    return player;
  };

  this.setPlayer = function(a_player) {
    player = a_player;
  };

  this.getEntities = function(a_entityType) {
    return entityList.getEntities();
  };

  this.getEntitiy = function(a_entityID) {
    return entityList.getEntitiy(a_entityID);
  }

  this.updateEntity = function(a_updatedEntity) {
    return entityList.update(a_updatedEntity);
  };

  this.saveEntity = function(a_entity) {
     return entityList.save(a_entity);
  };

  this.removeEntity = function(a_entityID) {
    return entityList.removeEntity(a_entityID);
  }

  this.getUtilities = function() {
    return utilities;
  }

  // Sequence
  utilities = new SPACEBULLETS.Utilities();
  entityList = new SPACEBULLETS.EntityList();
  this.generatePlayFieldDrawObjects();
  player = new SPACEBULLETS.Player(this);

  // Update
  function update() {
    var bgColor, drawEntity, entities;

    entities = entityList.getEntities();

    bgColor = [1.0, 1.0, 0.0, 1.0];

    if(graphicsDevice.beginFrame()) {
      graphicsDevice.clear(bgColor, 1.0);

      /* Rendering code */
      if(entities.length > 0) {
        for(drawEntity = 0; drawEntity < entities.length; drawEntity += 1) {
          // if the entity has a movement function, run it
          entities[drawEntity].movement ? entities[drawEntity].movement() : null;
          if(entities[drawEntity].drawAdditive === 1) {
            draw2D.begin('additive');
            draw2D.drawSprite(entities[drawEntity].draw());
            draw2D.end();
          } else {
            draw2D.begin();
            draw2D.draw(entities[drawEntity].draw());
            draw2D.end();
          }
        }
      }

      graphicsDevice.endFrame();
    }
  }

  TurbulenzEngine.setInterval(update, 1000 / 60);
};

SPACEBULLETS.GameCore.prototype.generatePlayFieldDrawObjects = function() {
  var graphicsDevice, playField, menu, drawPlayField, drawMenu;
  var that = this;

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
    id: that.getUtilities().randomID(),
    drawAdditive: 0,
    draw: function() {
      return {
        color: [1.0, 0.0, 0.0, 1.0],
        destinationRectangle: playField
      }
    }
  };

  drawMenu = {
    id: that.getUtilities().randomID(),
    drawAdditive: 0,
    draw: function() {
      return {
        color: [0.0, 1.0, 0.0, 1.0],
        destinationRectangle: menu
      }
    }
  };

  this.saveEntity(drawPlayField);
  this.saveEntity(drawMenu);
};

SPACEBULLETS.SpriteEntity = function() {
  var sprite, texture, textureCordinates, width, height, color,
      rotation, scale, xCord, yCord, shear, spriteOrigin;

  // standard values
  sprite = null;
  texture = null;
  textureCordinates = [0, 0, 25, 25];
  width = 25;
  height = 25;
  color = [1, 1, 1, 1];
  xCord = 25;
  yCord = 25;
  rotation = 0;
  spriteOrigin = [width / 2, height / 2];
  scale = [1, 1];
  shear = [0, 0];

  this.setTextureCordinates = function(newCords) {
    textureCordinates = newCords;
    if(sprite) {
      sprite.setTextureRectangle([0, 0, texture.width, texture.height]);
    }
  };

  this.getTextureCordinates = function() {
    return cordinates;
  };

  this.setTexture = function(a_texture) {
    texture = a_texture;
    if(sprite) {
      sprite.setTexture(texture);
      sprite.setTextureRectangle([0, 0, texture.width, texture.height]);
    }
  };

  this.getTexture = function() {
    return texture;
  };

  this.setWidth = function(a_width) {
    width = a_width;
    if(sprite) {
      sprite.setWidth(a_width);
    }
  };

  this.getWidth = function() {
    return width;
  };

  this.setHeight = function(a_height) {
    height = a_height;
    if(sprite) {
      sprite.setHeight(a_height);
    }
  };

  this.getHeight = function() {
    return height;
  };

  this.setColor = function(a_color) {
    color = a_color
    if(sprite) {
      sprite.setTexture(a_color);
    }
  };

  this.getColor = function() {
    return color;
  };

  this.setXCord = function(a_xCord) {
    xCord = a_xCord;
    if(sprite) {
      sprite.x = a_xCord;
    }
  };

  this.getXCord = function() {
    return xCord;
  };

  this.setYCord = function(a_yCord) {
    yCord = a_yCord;
    if(sprite) {
      sprite.y = a_yCord;
    }
  };

  this.getYCord = function() {
    return yCord;
  };

  this.setCords = function(cords) {
    xCord = cords[0];
    yCord = cords[1];
    if(sprite) {
      sprite.x = cords[0];
      sprite.y = cords[1];
    }
  };

  this.getCords = function() {
    return [xCord, yCord];
  };

  this.setRotation = function(a_rotation) {
    rotation = a_rotation;
    if(sprite) {
      sprite.rotation = a_rotation
    }
  };

  this.getRotation = function() {
    return rotation;
  };

  this.setSpriteOrigin = function(a_spriteOrigin) {
    spriteOrigin = a_spriteOrigin;
    if(sprite) {
      sprite.setOrigin(a_spriteOrigin);
    }
  };

  this.getSpriteOrigin = function() {
    return spriteOrigin;
  };

  this.setScale = function(a_scale) {
    scale = a_scale;
    if(sprite) {
      sprite.setScale(a_scale);
    }
  };

  this.getScale = function() {
    return scale;
  };

  this.setShear = function(a_shear) {
    shear = a_shear;
    if(sprite) {
      sprite.setShear(a_shear);
    }
  };

  this.getShear = function() {
    return shear;
  };

  this.setSprite = function(a_sprite) {
    sprite = a_sprite;
  };

  this.getSprite = function() {
    return sprite;
  };

  this.createSprite = function(spriteDetails) {
    if(!spriteDetails) {
      spriteDetails = {};
    }
    if(spriteDetails.texture) {
      texture = spriteDetails.texture;
    }

    if(spriteDetails.textureCordinates) {
      textureCordinates = spriteDetails.textureCordinates;
    }

    if(spriteDetails.width) {
      width = spriteDetails.width;
    }

    if(spriteDetails.height) {
      height = spriteDetails.height;
    }

    if(spriteDetails.color) {
      color = spriteDetails.color;
    }

    if(spriteDetails.xCord) {
      xCord = spriteDetails.xCord;
    }

    if(spriteDetails.yCord) {
      yCord = spriteDetails.yCord;
    }

    if(spriteDetails.rotation) {
      rotation = spriteDetails.rotation;
    }

    if(spriteDetails.spriteOrigin) {
      spriteOrigin = spriteDetails.spriteOrigin;
    }

    if(spriteDetails.scale) {
      scale = spriteDetails.scale;
    }

    if(spriteDetails.shear) {
      shear = spriteDetails.shear;
    }

    sprite = Draw2DSprite.create({
      texture : texture,
      textureRectangle : textureCordinates,
      width : width,
      height : height,
      color : color,
      x : xCord,
      y : yCord,
      rotation : rotation,
      origin : spriteOrigin,
      scale : scale,
      shear : shear
    });
  };
};

SPACEBULLETS.Player = function(core) {
  var inputDevice, keyCodes, sprite, onKeyDown, onKeyUp,
  upPressed, downPressed, rightPressed, leftPressed, movementSpeed;
  var that = this;

  upPressed, downPressed, rightPressed, leftPressed = false;
  movementSpeed = 8;

  this.id = core.getUtilities().randomID();
  this.drawAdditive = 1;
  this.createSprite();

  inputDevice = TurbulenzEngine.createInputDevice();
  keyCodes = inputDevice.keyCodes;
  sprite = this.getSprite();

  this.movement = function() {
    if(leftPressed) {
      sprite.x -= movementSpeed;
    }

    if(rightPressed) {
      sprite.x += movementSpeed;
    }

    if(upPressed) {
      sprite.y -= movementSpeed;
    }

    if(downPressed) {
      sprite.y += movementSpeed;
    }
  };

  onKeyDown = function onKeyDownFn(keycode) {
      if (keycode === keyCodes.LEFT) {
        leftPressed = true;
      } else if (keycode === keyCodes.RIGHT) {
        rightPressed = true;
      } else if (keycode === keyCodes.UP) {
        upPressed = true;
      } else if (keycode === keyCodes.DOWN) {
        downPressed = true;
      } else if (keycode === keyCodes.LEFT_SHIFT ||
        keycode === keyCodes.RIGHT_SHIFT) {
        movementSpeed = 4;
      }
  };

  onKeyUp = function onKeyUpFn(keycode) {
      if (keycode === keyCodes.LEFT) {
        leftPressed = false;
      } else if (keycode === keyCodes.RIGHT) {
        rightPressed = false;
      } else if (keycode === keyCodes.UP) {
        upPressed = false;
      } else if (keycode === keyCodes.DOWN) {
        downPressed = false;
      } else if (keycode === keyCodes.LEFT_SHIFT ||
        keycode === keyCodes.RIGHT_SHIFT) {
        movementSpeed = 8;
      }
  };

  inputDevice.addEventListener('keydown', onKeyDown);
  inputDevice.addEventListener('keyup', onKeyUp);

  this.draw = function() {
    return that.getSprite();
  }

  core.saveEntity(this);
};

SPACEBULLETS.Player.prototype = new SPACEBULLETS.SpriteEntity();

SPACEBULLETS.EntityList = function() {
  var entities = []

  this.getEntities = function() {
    return entities;
  }
};

SPACEBULLETS.EntityList.prototype.save = function(a_entity) {
  this.getEntities().push(a_entity);
};

SPACEBULLETS.EntityList.prototype.update = function(a_updatedEntity) {
  var entity, entities;
  entities = this.getEntities();
  for(entity = 0; entity < entities; entity += 1) {
    if(entities[entity].id === a_updatedEntity.id) {
      entities[entity].id = a_updatedEntity.id;
      return true;
    }
  }
  return false;
};

SPACEBULLETS.EntityList.prototype.getEntitiy = function(a_entityID) {
  var entity, entities;
  entities = this.getEntities();
  for(entity = 0; entity < entities; entity += 1) {
    if(entities[entity].id === a_entityID) {
      return entities[entity];
    }
  }
  return false;
};

SPACEBULLETS.EntityList.prototype.removeEntity = function(a_entityID) {
  var entity, entities;
  entities = this.getEntities();
  for(entity = 0; entity < entities; entity += 1) {
    if(entities[entity].id === a_entityID) {
      entities.splice(entity, 1);
      return true;
    }
  }
  return false;
}

SPACEBULLETS.Utilities = function() {

};

SPACEBULLETS.Utilities.prototype.randomID = function() {
  // http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + s4() + s4() + s4();
}

window.onload = function() {
	new SPACEBULLETS.GameCore();
};
