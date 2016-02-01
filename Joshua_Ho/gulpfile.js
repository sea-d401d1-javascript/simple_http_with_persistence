const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulp = require('gulp');

var files = [ __dirname + "server.js" , 
__dirname + 'lib/index.html' , 
__dirname + 'test/test.js'];


gulp.task('mocha' , () => {

	return gulp.src(['./test/*.js'])
				.pipe( mocha() );

});

//Referenced from Ardian's gulpfile


gulp.task('watch' , () => {
	return gulp.watch( files , ['eslint' , 'mocha']);
});

gulp.task('default' , ['mocha', 'eslint' , 'watch']);

gulp.task('eslint', function(){
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