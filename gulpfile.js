var gulp = require('gulp');
var exec = require('child_process').exec 

gulp.task('default', function () {
  console.log('starting server');
  require('./app.js');
})

