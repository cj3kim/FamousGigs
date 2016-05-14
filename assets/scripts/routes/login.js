var Easing     = require('famous/transitions/Easing');
var RenderNode = require('famous/core/RenderNode');
var Modifier   = require('famous/core/Modifier');
var Registration = require('../views/registration/index');
var Transform  = require('famous/core/Transform');

module.exports = function (page, obj) {
  var bodyRC = obj.bodyRC;
  var login = new Registration({
    props: {
      headerName: "Login",
      submitCopy: "Sign in",
      login: true
    },
    midAlign: true,
    marginTop: 0,
    gutterCol: 0,
    gutterRow: 0,
    transition: { curve: Easing.outBack, duration: 500 },
    mobileWidth: 300
  });

  var renderNode = new RenderNode();
  var offsetMod = new Modifier({transform: Transform.translate(0,30,0)});

  renderNode.add(offsetMod).add(login);

  page('/login', function (ctx) {
    bodyRC.show(renderNode);
  });
};
