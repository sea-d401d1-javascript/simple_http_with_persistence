var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var files = ['gulpfile.js', 'lib/*.js', 'test/*.js'];
gulp.task('lint', ['test'], function() {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', function() {
  return gulp.src(files)
    .pipe(mocha());
});

gulp.task('watch', function() {
  gulp.watch(files, ['test', 'lint']);
});

gulp.task('default', ['lint', 'test']);
