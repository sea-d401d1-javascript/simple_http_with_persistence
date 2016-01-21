var gulp = require('gulp');
var mocha = require('gulp-mocha');
var eslint = require('gulp-eslint');
gulp.task('default', ['eslint_check', 'mocha_tests', 'watch']);
gulp.task('function', function() {
  /* Place code for your "function" task here, what is run when:
  $gulp function
  is called. */
});

gulp.task('eslint_check', function() {
  return gulp.src(['**/*.js','!node_modules/**','!dist/*.js']).pipe(eslint(
    {
      'settings': {
        'ecmascript': 6
      },
      'ecmaFeatures': {
        'blockBindings': true,
        'arrowFunctions': true
      },
      'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module',
        'ecmaFeatures': {
          'jsx': true
        },
      },
      'env': {
        'browser': true,
        'jquery': true,
        'node': true,
        'mocha': true
      },
      'rules': {
        'semi': 1,
        'strict': 0,
        'indent': [2, 2],
        'quotes': [1, 'single'],
        'no-multi-spaces': [1, {
          'exceptions': {
            'VariableDeclarator': true,
            'FunctionExpression': true
          }
        }],
        'key-spacing': [0, {'align': 'value'}],
        'no-underscore-dangle': 0
      }
    }
  )).pipe(eslint.format()).pipe(eslint.failAfterError());
});

gulp.task('mocha_tests', function () {
  return gulp.src('./test/**/*.js').pipe(mocha({reporter: 'nyan'}));
});

gulp.task('watch', function() {
  gulp.watch(['**/*.js', '!package.json', '!node_modules/**'], ['eslint_check', 'mocha_tests']);
});
