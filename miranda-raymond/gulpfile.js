var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

var files = ['**/*.js', '!node_modules/**'];

gulp.task('jshint', function() {
  return gulp.src(files)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  return gulp.src(['./test/test.js']),{
    read:false
  }
    .pipe(mocha());
});


gulp.task('default', ['jshint', 'test']);
