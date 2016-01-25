var gulp = require('gulp');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');

var files = ['gulpfile.js', 'index.js', './lib/router.js', './test/server_test.js', 'server.js'];
gulp.task('lint', function(){
  return gulp.src(files)
  .pipe(eslint({
    'rules': {
      'indent': [
        2,
        2
      ],
      'quotes': [
        2,
        'single'
      ],
      'linebreak-style': [
        2,
        'unix'
      ],
      'semi': [
        2,
        'always'
      ]
    },
    'env': {
      'es6': true,
      'node': true,
      'mocha': true
    },
    'extends': 'eslint:recommended',
    'ecmaFeatures': {
      'jsx': true
    }
  }))
  .pipe(eslint.format());
});

gulp.task('mocha', function(){
  return gulp.src('test/*.js')
  .pipe(mocha());
});

gulp.task('watch', function(){
  return gulp.watch(files, ['lint', 'mocha']);
});

gulp.task('default', ['watch', 'lint', 'mocha']);
