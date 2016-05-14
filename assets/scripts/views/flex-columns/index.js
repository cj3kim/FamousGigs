var View = require('famous/core/View');
var Entity = require('famous/core/Entity');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var TransitionableTransform = require('famous/transitions/TransitionableTransform');
var Easing = require('famous/transitions/Easing');
var SpecParser = require('famous/core/SpecParser');
var _ = require('underscore');
var Calculations = require('./calculations');

var objectMerge = require('object-merge');

function FlexColumns() {
  View.apply(this, arguments);

  this.totalWidth = null;
  this._mods = [];
  this._cols = [];
  this.id = Entity.register(this);
}

FlexColumns.DEFAULT_OPTIONS = {
  midAlign: true,
  marginTop: 0,
  gutterCol: 0,
  gutterRow: 0,
  transition: { curve: Easing.outBack, duration: 500 },
  mobileWidth: 300
};

FlexColumns.prototype = Object.create(View.prototype);
FlexColumns.prototype.constructor = FlexColumns;

FlexColumns.prototype.createCol  = function (initialWidth) {
  //initialWidth is overrided when the columns
  //stack onto each other as a single column.

  var colObj = {
    initialWidth: initialWidth,
    colHeight: null,
    nodes: [],
    states: [],
    sizes: [],
    mods: []
  };

  this._cols.push(colObj);
  return this;

  //columns were originally created with initial widths.
  //how should these widths transition between screen size states? 
  //how should the data be stored? 
  //these columns will also stack on top of each other as well. 
  //how do i implement that? 
};

FlexColumns.prototype.addColNode = function (colIndex, node, size) {
  //Modifiers will dictate the size of a surface.
  var colObj = this.getCol(colIndex);

  //Simply push the state data here and execute them later.

  colObj.nodes.push(node);
  colObj.sizes.push(size);

  function computeTotalWidth (cols) {
    var totalWidth = 0;
    _.each(cols, function (colObj, colIndex) {
      totalWidth += colObj.initialWidth;
    });
    return totalWidth;
  }
  this.totalWidth = computeTotalWidth(this._cols);

  return this;
};

FlexColumns.prototype.resizeFlow = function (contextWidth) {
  var _this = this;

  var testResizeWidth = 700;
  if (contextWidth < testResizeWidth) {
    _this.mobileFlow(contextWidth);
  } else {
    _this.desktopFlow(contextWidth);
  }
};


function adCheck(node, size) {
  var nodeHeight
  if (node.ad) {
    var element = node.ad._element
    nodeHeight = element ? element.offsetHeight : size[1];
  } else {
    nodeHeight = size[1];
  }
  return nodeHeight;
};

FlexColumns.prototype.createMod = function (colObj, rowIndex, position, size, node) {
  if (colObj.mods[rowIndex] === undefined ) {
    var transitionObj = _createState.call(this, position, size);
    var mod = new Modifier(transitionObj);
    mod._node = node;

    colObj.mods[rowIndex] = mod;
    colObj.states[rowIndex] = transitionObj;
    this._mods.push(mod);
  }

};

FlexColumns.prototype.iterator = function (contextWidth, computePosition, mobile) {
  var _this = this;

  var ColOffset = 0;
  var RowOffset = 0;

  //Iterate through each column
  _.each(_this._cols, function (colObj, colIndex) {
    //Iterate through each row/node
    var nodes = colObj.nodes;

    RowOffset = mobile ? RowOffset : 0;
    _.each(nodes, function (node, rowIndex) {
      var size = colObj.sizes[rowIndex];
      var nodeHeight = adCheck(node, size);

      var newSize = [null, null];
      newSize[0] = mobile ? _this.options.mobileWidth : size[0];
      newSize[1] = nodeHeight;

      var position = computePosition.call(_this, colIndex, rowIndex, ColOffset, RowOffset, newSize, contextWidth, nodeHeight);

      _this.createMod.call(_this, colObj, rowIndex, position, size, node);

      if (size[1] === true) newSize[1] = true;
      _animateModifier.call(_this, colIndex, rowIndex, position, newSize);
      RowOffset += nodeHeight;
    });
    ColOffset += mobile ? Calculations.computeColHeight(colObj.states) : colObj.initialWidth;
  });
};

FlexColumns.prototype.mobileFlow = function (contextWidth) {
  var computePosition = function (colIndex, rowIndex, yColOffset, yRowOffset, size, contextWidth, nodeHeight) {
    var mobileSize = [this.options.mobileWidth, nodeHeight];
    var position = Calculations.computeMobilePosition.call(this, colIndex, rowIndex, yColOffset, yRowOffset, mobileSize, contextWidth);
    return position;
  }

  this.iterator(contextWidth, computePosition, true);
};

FlexColumns.prototype.desktopFlow = function (contextWidth) {
  this.iterator(contextWidth, Calculations.computeDesktopPosition, false);
};

FlexColumns.prototype.render = function () {
  return this.id;
};

FlexColumns.prototype.commit = function (context) {
  var contextWidth = context.size[0];

  if (this._cachedWidth !== contextWidth) {
    this._cachedWidth = contextWidth;
    this.resizeFlow(contextWidth);
  }

  var specs = [];
  for (var i = 0; i < this._mods.length; i += 1) {
    var mod = this._mods[i];

    var node = mod._node;
    var target = node.render();

    var spec = mod.modify(target);
    spec.transform = Transform.multiply4x4(spec.transform, context.transform);
    spec.opacity = context.opacity; //TODO look into a better way to deal with specs.
    specs.push(spec);
  }

  return specs;
};


FlexColumns.prototype.getCol = function (colIndex) {
  return this._cols[colIndex];
};

function _animateModifier(colIndex, rowIndex, position, size) {
  var colObj = this.getCol(colIndex);
  var transformTransitionable = colObj.states[rowIndex].transform;
  var sizeTransitionable = colObj.states[rowIndex].size;

  sizeTransitionable.halt();
  transformTransitionable.halt();

  transformTransitionable.setTranslate(position, this.options.transition);
  sizeTransitionable.set(size, this.options.transition);
}

function _createState(position, size) {
  var transitionObj = {
    transform: new TransitionableTransform(Transform.translate.apply(this, position)),
    size: new Transitionable(size)
  };
  return transitionObj;
}

module.exports = FlexColumns;
