var Surface = require('famous/core/Surface');
var RenderNode = require('famous/core/RenderNode');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');

module.exports = function (model) {
  var rn = new RenderNode();
  var mod = new Modifier({
    transform: Transform.translate(25,25,0)
  });

  var exitBtn = new Surface({
    size: [40,40],
    classes: ['circle-icon'],
    properties: {
      backgroundColor: '#40adc2'
    },
    content: '<span>x</span>'
  });

  rn.add(mod).add(exitBtn);
  exitBtn.on('click', function () {
    model.destroy({
      success: function (model) {
        console.log(model);
        alert('work has been destroyed')
      },
      error: function (err) {
        console.log(err);
        console.log('there was an error with destroying the work');
      }
    });
  });

  return rn;
};



