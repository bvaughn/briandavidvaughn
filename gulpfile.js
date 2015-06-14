var concat = require('gulp-concat');
var gulp = require('gulp');
var rimraf = require('rimraf');
var runSequence = require('gulp-run-sequence');
var sass = require('gulp-sass');
var shell = require('gulp-shell')
var watch = require('gulp-watch');

gulp.task('build', [
  'concatJavascript',
  'copyHtml',
  'compileCss',
  'copyResources'
]);

gulp.task('clean', function(callback) {
  rimraf('dist', callback);
});

gulp.task('copyHtml', ['clean'], function() {
  return gulp.src(['source/**/*.html'], {
    base: 'source'
  }).pipe(gulp.dest('dist/'));
});

gulp.task('copyResources', ['clean'], function() {
  return gulp.src(['images/**/*', 'data/**/*'], {
    base: '.'
  }).pipe(gulp.dest('dist/'));
});

gulp.task('concatJavascript', ['clean'], function() {
  return gulp.src('source/**/*.js')
    .pipe(concat('built.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compileCss', ['clean'], function() {
  return gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(concat('built.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('rsync', shell.task(
  [
    'gsutil rsync -R . gs://www.briandavidvaughn.com'
  ],
  {
    cwd: 'dist/'
  }));
