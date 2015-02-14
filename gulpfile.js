var gulp = require('gulp');
var exec = require('child_process').exec 

gulp.task('default', function () {
  console.log('starting server');
  require('./app.js');
})



var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

gulp.task('js', function () {
   return gulp.src('app/assets/scripts/*.js')
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('public/scripts'));
});
