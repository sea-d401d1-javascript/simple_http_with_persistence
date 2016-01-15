var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var files = ['**/*.js', '!node_modules/**', '!data/**'];

gulp.task('eslint', () => {
  return gulp.src(files)
    .pipe(eslint({
      'rules': {
        'indent': [2, 2],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-console': 0,
        'no-path-concat': 0,
        'dot-notation': 0,
        'curly': 0,
        'quote-props': 0,
        'arrow-parens': 0,
        'no-unused-vars': 0
      },
      'env': {
        'es6': true,
        'node': true,
        'mocha': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(eslint.format());
});

gulp.task('test', () => {
  return gulp.src(['test/*.js'], {
    read: false
  })
    .pipe(mocha());
});

gulp.task('default', ['eslint', 'test']);
