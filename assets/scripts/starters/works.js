var Engine     = require('famous/core/Engine');
var FlexGrid = require('../views/FlexGrid');
var page = require('page');
var Works = require('../collections/singleton/works');
var Work = require('../views/work/index');
var Promise = require('bluebird');
var genStarter = require('./genStarter');

module.exports = function () {
  var dashboard = arguments[0];

  var flexGridOptions = {
    marginTop:  20,
    marginSide: 0,
    gutterCol:  20,
    gutterRow:  40,
    itemSize: [300,500],
  };
  var workViewFn = function (model) {
    var ary = [model.get('media_type'), model];
    dashboard ? ary.push(dashboard): "";

    return Work.apply(this, ary);
  };
  var flexGrid = genStarter(flexGridOptions, 'Works', Works, workViewFn);
  return flexGrid;
};
