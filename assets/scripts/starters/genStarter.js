var FlexGrid = require('../views/FlexGrid');
var page = require('page');
var Promise = require('bluebird');

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

module.exports = function (flexGridOptions, resourceName, resource, viewFn) {
  var flexGrid = new FlexGrid(flexGridOptions);
  var methodName = "load" + resourceName.capitalizeFirstLetter();

  flexGrid[methodName] = function () {
    var surfaces = [];
    var userId;
    if (arguments.length > 0)
      userId = arguments[0];

    var models = userId ? resource.where({user_id: userId}) : resource.models;

    for (var i = 0; i < models.length; i++) {
      var model = models[i];
      var surface = viewFn(model);
      surfaces.push(surface);
    }
    flexGrid.sequenceFrom(surfaces);
  };

  var promise = Promise.resolve(resource.fetch());
  promise
    .then(function () {
      flexGrid[methodName]();
    });

  return flexGrid;
};
