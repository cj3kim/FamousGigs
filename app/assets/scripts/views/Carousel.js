
var View = require('famous/core/View');
var ViewSequence = require('famous/core/ViewSequence');
var LightBox = require('famous/views/LightBox');
var Transform = require('famous/core/Transform');

var RenderController = require('famous/views/RenderController');
var FormFairy = require('../lib/FormFairy');


function Carousel (array) {
  View.apply(this, arguments);

  var _this = this;
  this._viewSequence = new ViewSequence({array:array, loop: true});
  this.formFairy = new FormFairy();

  for (var i = 0, l = array.length; i < l; i ++) {
    var view = array[i];
    _this._eventInput.subscribe(view._eventOutput)
  }

  var lightBox = new LightBox({
    inAlign: [0,0],
    outAlign: [0,0],
    showAlign: [0,0],
    inTransform: Transform.multiply4x4(Transform.translate(-500, 0,-500), Transform.rotate(0,200,0)),
    outTransform: Transform.multiply4x4(Transform.translate(500, 0,-100), Transform.rotate(0,-200,0)),
  });
  this._lightBox = lightBox;

  var transition = {duration: 500};

  _this._eventInput.on('next-view', function (data) {
    _this.formFairy.addData(data);
    _this._viewSequence = _this._viewSequence.getNext();

    console.log(_this.formFairy);
    lightBox.show(_this._viewSequence.get(), transition);
  });

  this._node.add(lightBox);
  //var view = this._viewSequence.get();
  //this._lightBox.show(view, transition);
 
  this.showFirst = function () {
    var transition = {duration: 500};
    var view = this._viewSequence.get();
    this._lightBox.show(view, transition);
  };

}

Carousel.DEFAULT_OPTIONS = {};

Carousel.prototype = View.prototype;
Carousel.prototype.constructor = View;

module.exports = Carousel;
