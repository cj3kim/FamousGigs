
var View             = require('famous/core/View');
var Surface          = require('famous/core/Surface');
var RenderController = require('famous/views/RenderController');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');

function NotificationBox () {
  View.apply(this, arguments);

  this.initialize();
  this.setupEventListeners();
  this.setupPiping();
};

NotificationBox.prototype = Object.create(View.prototype);
NotificationBox.prototype.constructor = NotificationBox;

NotificationBox.prototype.initialize = function () {
  var renderController = new RenderController();

  var notificationBox = new Surface({
    size: [undefined, 50],
    properties: {
      backgroundColor: 'red',
      color: 'white'
    }
  });

  var mod = new Modifier({
    transform: Transform.translate(4,4,10)
  });

  this.notificationBox  = notificationBox;
  this.renderController = renderController;
  this.add(mod).add(renderController);
};

NotificationBox.prototype.setupEventListeners = function () {
  var _this = this;
  _this.notificationBox.on('new-notification', function (xhr) {
    _this.notificationBox.setContent(xhr.responseText);
    _this.renderController.show(_this.notificationBox);
  });
};
NotificationBox.prototype.setupPiping = function () {
  this._eventInput.pipe(this.notificationBox._eventOutput);
};

var notificationView;

function generateSingleton() {
  if (notificationView) return notificationView;
  notificationView = new NotificationBox();
  return notificationView;
}


module.exports = generateSingleton;

