var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();

// compile sass w/ vendor prefixes
gulp.task('styles', function() {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./styles'))
    .pipe(browserSync.stream());
});

// start server
gulp.task('serve', ['styles'], function() {
  browserSync.init({
    server: './'
  });
  gulp.watch('./styles/**/*.scss', ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
});

// default
gulp.task('default', ['serve']);
