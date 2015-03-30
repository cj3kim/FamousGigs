var View = require('famous/core/View');
var Entity = require('famous/core/Entity');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
var Easing = require('famous/transitions/Easing');


function FlexContent(options) {
  View.apply(this, arguments);

  this._modifiers = [];
  this._cols = [];
  this._cachedWidth = undefined;

  for (var i = 0; i < this.options.colAmt; i += 1) {
    this._cols.push([]);
    this._modifiers.push([]);
  }
 
  this.id = Entity.register(this);
}

FlexContent.DEFAULT_OPTIONS = {
  colAmt: 2,
  gutterCol: 0,
  gutterRow: 0, 
  responsive: false,
  transition: { curve: Easing.outBack, duration: 500 }
};

FlexContent.prototype = Object.create(View.prototype);
FlexContent.prototype.constructor = FlexContent;

FlexContent.prototype.render = function () {
  return this.id;
}

FlexContent.prototype.commit = function (context) {
  var contextWidth = context.size[0];
  var specs = [];

  if (this._cachedWidth !== contextWidth) {
    for (var i = 0; i < this._cols.length; i += 1) {
      var colSurfaces = this._cols[i];
      this.resizeFlow(i, colSurfaces, contextWidth);
    }
  }
  return specs;
};


FlexContent.prototype.resizeFlow = function (colIndex, surfaces, contextWidth) {
  for (var rowIndex = 0; rowIndex < surfaces.length; rowIndex += 1) {
    var surface = surfaces[i];
    var position = _calculatePosition.apply(this, colIndex, rowIndex, surface);

    if (this._modifiers[colIndex][rowIndex] === undefined) {
      var modifier = _createModifier.apply(this, position, surface);
      this._modifiers[colIndex].push(modifier);
      surface._modifier = modifier;
    else {
      _animateModifier.apply(this, position, surface);
    }
  }
};

function _calculatePosition (colIndex, rowIndex, surface, contextWidth) {
  var surfaceSize  = surface.getSize();
  var surfaceWidth = surfaceSize[0];
  var surfaceHeight = surfaceSize[1];

  var midAlign = _calculateMidAlign.apply(this, this._cols, contextWidth);
  var x = colIndex * (surfaceWidth + this.options.gutterCol);
  var y = rowIndex * (surfaceHeight + this.options.gutterRow);

  x += midAlign;

  return [x,y,0];
}

function _createModifier(position, surface) {
  var transitionObj = {
    transform: new TransitionableTransform(Transform.translate.apply(this, position));
  };

  var modifier = new Modifier(transitionObj);
  modifier._transitionableTransform = transitionObj;

  return modifier;
}

function _animateModifier(colIndex, rowIndex, position, surface) {
  var transformTransitionable = this._modifier[colIndex][rowIndex]._transitionableTransform.transform
  transformTransitionable.halt();
  transformTransitionable.setTranslate(position, this.options.transition);
}

function _calculateMidAlign (cols, contextWidth) {
  var contentWidth = 0;
  //This  is a naive implementation below. It assumes that the largest width for content
  //will be derived from the first row. 
  for (var i = 0; i < cols.length; i += 1) {
    var surface = cols[i][0];
    var surfaceWidth = surface.getSize()[0];
    contentWidth += surfaceWidth;
  }

  var midAlign = (contextWidth - contentWidth) / 2;

  return midAlign;
}
// What do I want this view to do achieve? 

//1. I want to be able to place scrollable content of varying sizes within this view. 
//2. I need it to be responsive. I should probably do a 3 or 4 column layout. 
//3. What should the size of each column be? I'd like to simply declare this attribute.
//4. Write out an API.



