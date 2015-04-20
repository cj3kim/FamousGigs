module.exports = function () {
  var ContainerSurface = require('famous/surfaces/ContainerSurface');

  var SidebarMenu = require('./index');
  var sidebarMenu = new SidebarMenu();

  var containerSurface = new ContainerSurface({
    size: [undefined, undefined],
    properties: {
      backgroundColor: "#0d283f"
    }
  });
  containerSurface._lb = sidebarMenu._lb;

  containerSurface.add(sidebarMenu);

  return containerSurface;
}
