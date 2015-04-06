
var View = require('famous/core/View');
var ViewSequence = require('famous/core/ViewSequence');
var LightBox = require('famous/views/LightBox');
var Transform = require('famous/core/Transform');

var RenderController = require('famous/views/RenderController');

function Carousel (array) {
  View.apply(this, arguments);
  this._viewSequence = new ViewSequence(array);

  var _this = this;

  var lightBox = new LightBox({
    inAlign: [0,0],
    outAlign: [0,0],
    showAlign: [0,0],
    inTransform: Transform.multiply4x4(Transform.translate(-500, 0,-500), Transform.rotate(0,200,0)),
    outTransform: Transform.multiply4x4(Transform.translate(500, 0,-100), Transform.rotate(0,-200,0)),
  });
  //var lightBox = new RenderController();

  this._node.add(lightBox);

  var view = this._viewSequence.get();
  console.log('view1');
  console.log(view);

  lightBox.show(view, {duration: 1000});

  //view.surface.on('click', function () {
    //_this._viewSequence = _this._viewSequence.getNext();
    //var view2 = _this._viewSequence.get();
    //console.log('view2');
    //console.log(view2);

    //lightBox.show(view2, {duration: 1000});
  //});

}

Carousel.DEFAULT_OPTIONS = {};

Carousel.prototype = View.prototype;
Carousel.prototype.constructor = View;

module.exports = Carousel;
