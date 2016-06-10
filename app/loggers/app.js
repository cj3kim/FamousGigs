var bunyan = require('bunyan');
var path = require('path');
var fs = require('fs');

function errorSerializer(err) {
  return {
    type:    err.type,
    name:    err.name,
    message: err.message,
    stack:   err.stack,
  };
}

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    ip: req.ip,
  };
}


var logDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logDir)){
    fs.mkdirSync(logDir);
}
var logger = bunyan.createLogger({
    name: 'main',
    serializers: {
      error: errorSerializer,
      req: reqSerializer
    },
    streams: [
      {
        level: 'info',
        stream: process.stdout
      },
      {
        level: 'error',
        stream: process.stderr
      },
      {
        path: path.join(logDir, 'main-log.json')
      }
    ]
});


module.exports = logger;
