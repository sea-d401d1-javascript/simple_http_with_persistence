var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], { read: false })
  .pipe(mocha({ reporter: 'list' }))
  .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});

var files = ['**/*.js','!node_modules/**'];

gulp.task('lint', function(){
  return gulp.src(files)
  .pipe(eslint({
        extends: 'eslint:recommended',
        ecmaFeatures: {
            'modules': true
        },
        rules: {
            'no-console': 0,
            'no-irregular-whitespace': 2,
            'no-unused-vars': 1
        },
        globals: {
            'jQuery':false,
            '$':false
        },
        envs: [
            'node',
            'mocha',
            'es6',
            'modules'
        ]
    }))
  .pipe(eslint.format());
});

gulp.task('default', ['lint', 'mocha']);
