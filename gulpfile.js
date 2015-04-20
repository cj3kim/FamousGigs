var   gulp       = require('gulp')
    , exec       = require('child_process').exec 
    , browserify = require('browserify')
    , watchify   = require('watchify')
    , fromArgs   = require('watchify/bin/args')
    , source     = require("vinyl-source-stream")
    , path       = require('path')
    , _          = require('underscore')
    , browserSync = require('browser-sync').create();
    ;

var sass = require('gulp-sass');
var uglify = require('gulp-uglify'),
    concatCSS = require('gulp-concat-css');

gulp.task('default',['fonts', 'sass', 'browserify-watch', 'watch', 'start-dev-server'])

gulp.task('start-dev-server', function () {
  require('./app.js');
  //exec("browser-sync start --proxy localhost:1337  --files 'public/**/*.*'");
});

gulp.task('fonts', function () {
    gulp.src('./app/assets/fonts/**/*')
      .pipe(gulp.dest('./public/fonts'));
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
  b.transform('reactify');

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
      .on('error', function(err){
        console.log(err.message);
        this.end();
      })
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
