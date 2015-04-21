var View = require('famous/core/View');
var Entity = require('famous/core/Entity');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
var Easing = require('famous/transitions/Easing');

function FlexGrid() {
    View.apply(this, arguments);

    this._height;
    this._modifiers = {};
    this._states = [];
    this._filterObj = {};
    this._filterDirty = null;

    this.id = Entity.register(this);
}

FlexGrid.prototype = Object.create(View.prototype);
FlexGrid.prototype.constructor = FlexGrid;

FlexGrid.DEFAULT_OPTIONS = {
    marginTop: undefined,
    marginSide: undefined,
    gutterCol: undefined,
    gutterRow: undefined,
    itemSize: undefined,
    transition: { curve: Easing.outBack, duration: 500 }
};

function _calcSpacing(width) {
    var itemWidth = this.options.itemSize[0];
    var gutterCol = this.options.gutterCol;
    var ySpacing = itemWidth + gutterCol;
    var margin = this.options.marginSide;
    var numCols = Math.floor((width - 2 * margin + gutterCol) / ySpacing);
    numCols = Math.min(this._items.length, numCols);
    margin = (width - numCols * ySpacing + gutterCol)/2;
    return {
        numCols: numCols,
        marginSide: margin,
        ySpacing: ySpacing
    };
}

function _calcPositions(spacing) {
    var positions = [];

    var col = 0;
    var row = 0;
    var xPos;
    var yPos;

    for (var i = 0; i < this._items.length; i++) {
        xPos = spacing.marginSide + col * spacing.ySpacing;

        yPos = this.options.marginTop + row * (this.options.itemSize[1] + this.options.gutterRow);
        positions.push([xPos, yPos, 0]);

        col++
        if (col === spacing.numCols) {
            row++;
            col = 0;
        }
    }

    this._height = yPos + this.options.itemSize[1] + this.options.marginTop;

    return positions;
}

function _createModifier(index, position, size) {
    var transitionItem = {
        transform: new TransitionableTransform(Transform.translate.apply(null, position)),
        size: new Transitionable((size || this.options.itemSize))
    }

    var modifier = new Modifier(transitionItem);

    this._states[index] = transitionItem;
    this._modifiers[index] = modifier;
}

function _animateModifier(index, position, size) {
    var transformTransitionable = this._states[index].transform;
    var sizeTransitionable = this._states[index].size;
    transformTransitionable.halt();
    sizeTransitionable.halt();
    transformTransitionable.setTranslate(position, this.options.transition);
    sizeTransitionable.set(size, this.options.transition);
}

FlexGrid.prototype.sequenceFrom = function(items) {
    //create the modifiers here.
    this._items = items;
};

FlexGrid.prototype.render = function() {
    return this.id;
};

FlexGrid.prototype.commit = function(context) {
    var width = context.size[0];

    var specs = [];

    if (this._cachedWidth !== width || this._filterDirty) {

      this.resizeFlow(width);
    }

    for (var i = 0; i < this._modifiers.length; i++) {
        var spec = this._modifiers[i].modify({
            target: this._items[i].render()
        });

        specs.push(spec);
    }

    return specs;
};

FlexGrid.prototype.resizeFlow = function () {
  var width = arguments[0] ? arguments[0] : this._cachedWidth;

  var spacing = _calcSpacing.call(this, width);
  var size = this.options.itemSize;

  var positions = _calcPositions.call(this, spacing);

  var keys = Object.keys(this._filterObj);

  var i,j,k = 0,0,0;
  var modifier, showBool, key;
  while (i + j < keys.length) {
    k = i+j;
    key = keys[k];
    showBool = this._filterObj[k]
    modifier = this._modifiers[key];

    if (modifier === undefined) {
      //_createModifier
    }

    if (showBool) {
      //animate in the surface.
      i++;
    } else {
      //fade in the surface.
      j++;
    }
  }

  this._cachedWidth = width;
};

FlexGrid.prototype.getSize = function() {
    if (!this._height) return;
    return [this._cachedWidth, this._height];
};

module.exports = FlexGrid;
