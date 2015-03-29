var View = require('famous/core/View');
var Entity = require('famous/core/Entity');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
var Easing = require('famous/transitions/Easing');

function FlexNavbar(options) {
  View.apply(this, arguments);

  this._height;
  this._modifiers = {left: [], right: []};
  this._states = {left: [], right:[]};

  this._dock = {};

  this.id = Entity.register(this);
}

FlexNavbar.prototype = Object.create(View.prototype);
FlexNavbar.prototype.constructor = FlexNavbar;

FlexNavbar.prototype.render = function () {
  return this.id;
};

FlexNavbar.prototype.commit = function (context) {
  var contextWidth = context.size[0];
  var specs = [];
  var surface, surfaces, size;

  var keys = Object.keys(this._dock);

  for (var i = 0; i < keys.length; i += 1) {
    var dockType = keys[i];
    surfaces = this._dock[dockType];
    this.processSurfaces(surfaces, contextWidth, dockType);

    for (var j = 0; j < surfaces.length; j += 1) {
      var surface = surfaces[j];
      var mod = surface._modifier;
      var spec = mod.modify({target: surface.render()});

      specs.push(spec);
    }
  }

  return specs;
};

FlexNavbar.prototype.processSurfaces = function (surfaces, contextWidth, dockType) {
  for (var i = 0; i < surfaces.length; i++) {
    surface = surfaces[i];

    if (this._modifiers[dockType][i] === undefined) {
     var modifier = _createModifier.call(this, i, surface, contextWidth, dockType);
     surface._modifier = modifier;
    }
    else {
      _animateModifier.call(this, i, surface, contextWidth, dockType);
    }
  }
}

FlexNavbar.prototype.linkDock= function(dock) {
    this._dock = dock;
};

FlexNavbar.prototype.getSize = function() {
  if (!this._height) return;
  return [this._cachedWidth, this._height];
};

function _createModifier(index, surface, contextWidth, dockType) {
  var surfaceSize = surface.getSize();
  var surfaceWidth = surfaceSize[0];

  var x = computeIncrementalX(index,surfaceWidth, contextWidth, dockType);
  var transitionItem = {
    transform: new TransitionableTransform(Transform.translate(x,0,0)),
  };

  var modifier = new Modifier(transitionItem);

  this._states[dockType][index] = transitionItem;
  this._modifiers[dockType][index] = modifier;

  return modifier;
}

function _animateModifier(index, surface, contextWidth, dockType) {
    var surfaceSize = surface.getSize();
    var surfaceWidth = surfaceSize[0];

    var x = computeIncrementalX(index,surfaceWidth, contextWidth, dockType);
    var position = [x,0,0];

    var transformTransitionable = this._states[dockType][index].transform;
    transformTransitionable.halt();
    transformTransitionable.setTranslate(position, this.options.transition);
}


function computeIncrementalX (index, surfaceWidth, contextWidth, docktype) {
  var x;
  switch (docktype) {
    case 'left':
      x = index * surfaceWidth;
      break;
    case 'right':
      x = _computeFromRight(index, surfaceWidth, contextWidth);
      break;
    default:
      // code
  }
  return x;
}


function _computeFromRight(index, surfaceWidth, contextWidth) {
  var j = index + 1;
  return contextWidth - (j * surfaceWidth);
}



module.exports = FlexNavbar;

