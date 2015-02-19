var   gulp       = require('gulp')
    , exec       = require('child_process').exec 
    , browserify = require('browserify')
    , watchify   = require('watchify')
    , fromArgs   = require('watchify/bin/args')
    , source     = require("vinyl-source-stream")
    , path       = require('path')
    , _          = require('underscore')
    ;

var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('default', function () {
  console.log('starting server');
  require('./app.js');
})

gulp.task('browserify-watch', function () {
  var b = browserify({ cache: {}, packageCache: {}, fullPaths: true })
  b = watchify(b);

  b.on('update', function() {
    bundle(b);
  });

  var startFile       = './app/assets/scripts/main.js';
  var destinationPath = './public/scripts';
  var buildName       = 'main.js';
  var buildFile       = path.join(destinationPath, buildName);
  var compiled = _.template('Bundling <%= startFile %> to <%= buildFile %>.')

  b.add(startFile)
  bundle(b);

  function bundle(b) {
    var startTime = Date.now();
    var endTime   = null;
    var startMessage = compiled({startFile: startFile, buildFile: buildFile});
    console.log(startMessage);

    var bundled = b.bundle();
    bundled
      .pipe(source(buildName))
      .pipe(gulp.dest(destinationPath));

    bundled.on('end', function () {
      endTime = Date.now();
      var performance = endTime - startTime;
      var endMessage = _.template("It took <%= ms %> ms to complete the bundle.")({ms: performance});
      console.log(endMessage);
    });
  }
});
