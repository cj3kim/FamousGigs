
var View             = require('famous/core/View');
var Surface          = require('famous/core/Surface');
var RenderController = require('famous/views/RenderController');
var Modifier         = require('famous/core/Modifier');
var Transform        = require('famous/core/Transform');
var RenderNode       = require('famous/core/RenderNode');

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
    classes: ['notification-box'],
    properties: {
      backgroundColor: 'red',
      color: 'white',
      textAlign: 'center',
    }
  });

  var mod = new Modifier({
    transform: Transform.translate(0,0,1)
  });
  var rn = new RenderNode();
  var exitBtn = new Surface({
    size: [40,40],
    classes: ['circle-icon'],
    content: '<span>x</span>'
  });

  exitBtnMod = new Modifier({
    transform: Transform.translate(10,5, 2)
  });

  rn.add(notificationBox);
  rn.add(exitBtnMod).add(exitBtn);

  this.exitBtn = exitBtn;
  this.notificationBox  = notificationBox;
  this.rn = rn
  this.renderController = renderController;
  this.add(mod).add(renderController);
};

NotificationBox.prototype.setupEventListeners = function () {
  var _this = this;
  var errorMessage;
  _this.exitBtn.on('click', function () {
    _this.renderController.hide();
  });
  _this.notificationBox.on('new-notification', function (xhr) {
    errorMessage = xhr.responseText.replace(/\w+:\s?(\w+)/i, "$1");

    _this.notificationBox.setContent("<span>" + errorMessage + "</span>");
    _this.renderController.show(_this.rn);
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

