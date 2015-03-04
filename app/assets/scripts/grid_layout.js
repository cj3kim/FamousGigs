var grid = new GridLayout({
  dimensions: [8, 8]
});

var surfaces = [];
var showing;

grid.sequenceFrom(surfaces);

var cmod = new StateModifier({
  inTransition: true,
  outTransition: false,
  overlap: true
});

var controller = new LightBox({
  inTransition: true,
  outTransition: false,
  overlap: true
});
controller.hide();

function newSurface(id) {
  var surface = new Surface({
    size: [undefined, undefined],
    content: id + 1,
    properties: {
      backgroundColor: "hsl(" + (id * 70 / 64) + ", 60%, 70%)",
      lineHeight: '50px',
      textAlign: 'center',
      cursor: 'pointer'
    }
  });

  surface._stateMod = new StateModifier({
    size: [500, 420],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });
  surface._renderNode = new RenderNode();
  surface._renderNode.add(surface._stateMod).add(surface);

  surfaces.push(surface);

  surface.on('click', function (context, e) {
    var inTransitionObj  = {curve: Easing.inElastic,  duration: 1000 }
    var outTransitionObj = {curve: Easing.outElastic, duration: 1000 }

    var hideFn = function () { gridModifier.setTransform(Transform.scale(1,1,1), outTransitionObj); };

    if (this === showing) {
      controller.hide(inTransitionObj, hideFn );
      showing = null;
    } else {
      showing = this;
      gridModifier.setTransform(Transform.scale(0.001, 0.001, 0.001), outTransitionObj)
      cmod.setTransform(Transform.translate(0,0, 0.0001));
      controller.show(this._renderNode, outTransitionObj);
    }  
  }.bind(surface, mainContext));
}

for (var i = 0; i < 64; i += 1) {
  newSurface(i);
}

var gridModifier = new StateModifier({
  size: [400, 400], 
  align: [0.5, 0.5],
  origin: [0.5, 0.5]
});

mainContext.add(gridModifier).add(grid);
mainContext.add(cmod).add(controller);
mainContext.add(navbarMod).add(navbarSurface);


