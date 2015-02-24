var   gulp       = require('gulp')
    , exec       = require('child_process').exec 
    , browserify = require('browserify')
    , watchify   = require('watchify')
    , fromArgs   = require('watchify/bin/args')
    , source     = require("vinyl-source-stream")
    , path       = require('path')
    , _          = require('underscore')
    ;

var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    concatCSS = require('gulp-concat-css');

gulp.task('default',['sass', 'browserify-watch', 'watch', 'start-dev-server'])

gulp.task('start-dev-server', function () {
  exec('node ./app.js');
});

gulp.task('sass', function () {
    gulp.src('./app/assets/styles/*.scss')
        .pipe(sass())
        .pipe(concatCSS('main.css'))
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('watch', function () {
  gulp.watch('./app/assets/styles/*.scss', ['sass'])
});

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
    b.transform('brfs')

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
