var bunyan = require('bunyan');
var path = require('path');

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
        path: path.join(__dirname, '..', '..', 'logs', 'main-log.json')
      }
    ]
});


module.exports = logger;
