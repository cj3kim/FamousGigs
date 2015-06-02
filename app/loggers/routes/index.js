var logger = require('../app.js');

var routeLogger = logger.child({
  app_section: 'routes'
});

var loggers = {};
function generateChild (name) {
  return routeLogger.child({
    route_file: name
  });
}

var ary = ['amazon', 'authentication', 'company_ads', 'developers', 'works'];
for (var i = 0; i < ary.length; i += 1) {
  var name = ary[i];
  loggers[name] = generateChild(name);
}

module.exports = loggers;
