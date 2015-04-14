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


function FlexColumns(options) {
  View.apply(this, arguments);

  this._mods = [];
  this._cols = [];
  this.id = Entity.register(this);
  console.log(this.options);
}

FlexColumns.DEFAULT_OPTIONS = {
  midAlign: true,
  marginTop: 0,
  gutterCol: 0,
  gutterRow: 0,
  transition: { curve: Easing.outBack, duration: 500 }
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


  return this;
};

FlexColumns.prototype.resizeFlow = function (contextWidth) {
  var _this = this;

  //TODO temporary solution to dynamic resizing

  var testResizeWidth = 900;
  if (contextWidth < testResizeWidth) {
    _this.mobileFlow(contextWidth);
  } else {
    _this.desktopFlow();
  }

  //Iterate through each column
};

FlexColumns.prototype.desktopFlow = function () {
  var xColOffset = 0;
  //Iterate through each column
  _.each(_this._cols, function (colObj, colIndex) {
    //Iterate through each row/node
    var nodes = colObj.nodes;
    var yRowOffset = 0;

    _.each(nodes, function (node, rowIndex) {
      console.log('desktop flow shouldnt be running right now');
      //var size = colObj.sizes[rowIndex];
      //var position = Calculations.computeDesktopPosition(xColOffset, yRowOffset, size);

      //_animateModifier.call(this, colIndex, rowIndex, position, size);
      //yRowOffset += nodeHeight;
    });

    xColOffset += colObj.initialWidth;
  });

};

FlexColumns.prototype.mobileFlow = function (contextWidth) {
  var _this = this;
  var yColOffset = 0;
  //Iterate through each column
  _.each(_this._cols, function (colObj, colIndex) {
    //Iterate through each row/node
    var nodes = colObj.nodes;
    var yRowOffset = 0;

    _.each(nodes, function (node, rowIndex) {
      var size = colObj.sizes[rowIndex];
      var nodeHeight = size[1];
      var position = Calculations.computeMobilePosition.call(_this, colIndex, rowIndex, yColOffset, yRowOffset, size, contextWidth);
      if (colObj.mods[rowIndex] === undefined ) {
        var transitionObj = _createState.call(_this, position, size);
        var mod = new Modifier(transitionObj);
        mod._node = node;

        colObj.mods[rowIndex] = mod;
        colObj.states[rowIndex] = transitionObj;
        _this._mods.push(mod);
      } else {

        var mobileSize = [268, size[1]];
        var position = Calculations.computeMobilePosition.call(_this, colIndex, rowIndex, yColOffset, yRowOffset, mobileSize, contextWidth);

        _animateModifier.call(_this, colIndex, rowIndex, position, mobileSize);
      }
      yRowOffset += nodeHeight;
    });

    yColOffset += Calculations.computeColHeight(colObj.states);
  });
};

FlexColumns.prototype.desktopFlow = function () {

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

  console.log('_animateModifier');
  console.log(size);
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
