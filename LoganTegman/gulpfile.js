'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');

const scripts = ['index.js', 'bin/*.js', 'lib/*.js', 'test/*.js'];

gulp.task('lint', () => {
  return gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src('test/*spec.js')
    .pipe(mocha());
});

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint', 'test']);
});

gulp.task('start', () => {
  nodemon({
    script: 'index.js',
    ext: 'html js'
  });
});

gulp.task('default', ['watch', 'lint', 'test', 'start']);
