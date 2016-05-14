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

var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var bg     = require('gulp-bg');

var env      = process.env;
var NODE_ENV = env.NODE_ENV;

var sass = require('gulp-sass');
var concatCSS = require('gulp-concat-css');

var devServerTasks = ['fonts', 'images', 'sass', 'browserify-watch', 'browser-sync', 'watch', 'dev-server'];
var serverTasks    = ['fonts', 'images', 'sass', 'build-main', 'server'];

var noServerTasks = ['fonts', 'images', 'sass', 'build-main'];
gulp.task('prepare-assets', noServerTasks);

var tasks = NODE_ENV === 'development' ? devServerTasks : serverTasks;

gulp.task('default', tasks);

gulp.task('dev-server', function () {
  require('./app.js')
});

gulp.task('server', bg('node', './app.js'));

gulp.task('browser-sync', bg("browser-sync",  'start', '--proxy', 'localhost:1337', '--files', 'public/**/*.*'));

gulp.task('images', function () {
  gulp.src('./assets/images/**/*')
    .pipe(gulp.dest('./public/images'));
});

gulp.task('fonts', function () {
  gulp.src('./assets/fonts/**/*')
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('sass', function () {
  gulp.src('./assets/styles/*.scss')
    .pipe(sass())
    .pipe(concatCSS('main.css'))
    .pipe(gulp.dest('./public/styles'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/styles/*.scss', ['sass'])
});

gulp.task('build-main', function() { // for non dev servers
  var b = browserify({ cache: {}, packageCache: {}, fullPaths: true })
  b.transform('reactify');
  var startFile       = './assets/scripts/main.js';
  var destinationPath = './public/scripts';
  var buildName       = 'main.js';
  var buildFile       = path.join(destinationPath, buildName);
  var compiled = _.template('Bundling <%= startFile %> to <%= buildFile %>.')

  b.add(startFile)

  var bundled = b.bundle();
  bundled
    .on('error', function(err){
      console.log(err.message);
      this.end();
    })
    .pipe(source(buildName))
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify())
    .pipe(gulp.dest(destinationPath));
});

gulp.task('browserify-watch', function () {
  var b = browserify({ cache: {}, packageCache: {}, fullPaths: true })

  b = watchify(b);
  b.transform('reactify');

  b.on('update', function() {
    bundle(b);
  });

  var startFile       = './assets/scripts/main.js';
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
