var View = require('famous/core/View');
var Entity = require('famous/core/Entity');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
var Easing = require('famous/transitions/Easing');
var RenderNode       = require('famous/core/RenderNode');
var RenderController = require('famous/views/RenderController');

function SearchFlexGrid() {
  View.apply(this, arguments);
  var _this = this;

  this._height;
  this._modifiers = {};
  this._states = {};
  this._models = {};
  this._items = {};

  this._filterObj = {};
  this._filterDirty = false;

  this.id = Entity.register(this);

  this._eventInput.on("filter-string", function (filterString) {
    console.log('SearchFlexGrid');
    console.log('filterString');
    console.log(filterString);
    _this._filterDirty = true;
    _this.filterCheck(filterString, 'job_location')
  });
}

SearchFlexGrid.prototype = Object.create(View.prototype);
SearchFlexGrid.prototype.constructor = SearchFlexGrid;

SearchFlexGrid.DEFAULT_OPTIONS = {
    marginTop: 10,
    marginSide: 20,
    gutterCol: 20,
    gutterRow: 20,
    itemSize: [265, 300],
    transition: { curve: Easing.outBack, duration: 500 }
};

function _calcSpacing(width) {
    var itemWidth = this.options.itemSize[0];
    var gutterCol = this.options.gutterCol;
    var ySpacing = itemWidth + gutterCol;
    var margin = this.options.marginSide;
    var numCols = Math.floor((width - 2 * margin + gutterCol) / ySpacing);

    var itemsLength = Object.keys(this._items).length;

    numCols = Math.min(itemsLength, numCols);
    margin = (width - numCols * ySpacing + gutterCol)/2;

    var spacing = {
        numCols: numCols,
        marginSide: margin,
        ySpacing: ySpacing
    };
    return spacing;
}

function _calcPositions(spacing) {
  var positions = [];

  var col = 0;
  var row = 0;
  var xPos, yPos;

  for (var i = 0; i < Object.keys(this._items).length; i++) {

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


function _animateModifier(modelId, position, size) {
    var transformTransitionable = this._states[modelId].transform;
    var sizeTransitionable = this._states[modelId].size;
    transformTransitionable.halt();
    sizeTransitionable.halt();
    transformTransitionable.setTranslate(position, this.options.transition);
    sizeTransitionable.set(size, this.options.transition);
}
SearchFlexGrid.prototype.render = function() {
    return this.id;
};

SearchFlexGrid.prototype.commit = function(context) {
  var width = context.size[0];
  var specs = [];

  if (this._cachedWidth !== width || this._filterDirty) {
    this.animateFlow(width);
  }

  var modelIds = Object.keys(this._filterObj);

  var i = 0;
  var key, renderBool;

  var specs = []
  while (i < modelIds.length) {
    key = modelIds[i];

    var modifier = this._modifiers[key];
    var spec = modifier.modify({
      target: this._items[key].render()
    });
    spec.transform = Transform.multiply4x4(spec.transform, context.transform);
    specs.push(spec);
    i++;
  }
  this._filterDirty = false;

  return specs;
};

SearchFlexGrid.prototype.animateFlow = function () {
  var width = arguments[0] ? arguments[0] : this._cachedWidth;

  var spacing = _calcSpacing.call(this, width);
  var size = this.options.itemSize;
  var positions = _calcPositions.call(this, spacing);

  var keys = Object.keys(this._filterObj);

  var i = 0, j = 0, k = 0;
  var modifier, position, showBool, modelId;
  if (positions.length > 0) {
    while (i + j < keys.length) {
      k = i+j;
      modelId = keys[k];
      showBool = this._filterObj[modelId]
      modifier = this._modifiers[modelId];
      position = positions[i];

      if (showBool) {
        _animateModifier.call(this, modelId, position, size);
        i++;
      } else {
        //TODO make this more polished
        modifier._rc.hide();
        j++;
      }
    }
    this._cachedWidth = width;
  }
};

SearchFlexGrid.prototype.addNode = function (model, surface) {
  var modelId = model.id;
  var transitionItem = {
    transform: new TransitionableTransform(Transform.translate.apply(null, [0,0,0])),
    size: new Transitionable(this.options.itemSize)
  };
  var modifier = new Modifier(transitionItem);

  var rn = new RenderNode();
  var rc = new RenderController();
  modifier._rc = rc;

  rn.add(rc);
  rc.show(surface);

  this._states[modelId]    = transitionItem;
  this._modifiers[modelId] = modifier;

  this._models[modelId]    = model;
  this._filterObj[modelId] = true;
  this._items[modelId]     = rn;

  this._filterDirty = true;
};


SearchFlexGrid.prototype.filterCheck = function (string, attribute) {
  var match, modelId, model, modelAttr;
  var re = new RegExp(string, 'i');

  for (modelId in this._models) {
    model = this._models[modelId];
    modelAttr = model.get(attribute);

    match  = re.test(modelAttr);

    console.log(match);
    this._filterObj[modelId] = match;
  }
  console.log(this._filterObj);
};


SearchFlexGrid.prototype.getSize = function() {
    if (!this._height) return;
    return [this._cachedWidth, this._height];
};

module.exports = SearchFlexGrid;
