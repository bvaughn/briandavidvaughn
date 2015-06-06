var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('build', ['concat', 'sass']);

gulp.task('concat', function () {
  gulp.src('source/**/*.js')
    .pipe(concat('built.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {
  gulp.src('sass/*.scss')
    .pipe(sass())
    .pipe(concat('built.css'))
    .pipe(gulp.dest('dist/'));
});
