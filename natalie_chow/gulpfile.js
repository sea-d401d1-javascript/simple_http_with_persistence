const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!**/node_modules/*'])
    .pipe(eslint({
      'rules': {
        'indent': [2, 2],
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
        'no-console': 0
      },
      'env': {
        'es6': true,
        'node': true,
        'browser': true,
        'mocha': true
      },
      'extends': 'eslint:recommended'
    }))
    .pipe(eslint.format());
});

gulp.task('test', function() {
  return gulp.src(['test/**/*test.js'], { read: false })
    .pipe(mocha());
});

gulp.task('default', ['test', 'lint']);
