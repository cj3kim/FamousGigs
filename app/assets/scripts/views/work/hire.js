var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Transform  = require('famous/core/Transform');
var Surface    = require('famous/core/Surface');

module.exports = function (user_id) {
  var hireMod = new Modifier({
    transform: Transform.translate(210, 445, 0)
  });

  var hire = new Surface({
    size: [72, 40],
    classes:['hire'],
    content: "<span>Hire</span>",
  });

  hire.on('click', function () {
    page.show('/developer/' + user_id);
  });

  var hireNode = new RenderNode();
  hireNode.add(hireMod).add(hire);

  return hireNode;
};

