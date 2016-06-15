const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');

const $ = gulpLoadPlugins();

gulp.task('styles', () => {
  return gulp.src('./styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./styles/'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src('./scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['styles', 'scripts'], () => {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });

  gulp.watch('./styles/**/*.scss', ['styles']);
  gulp.watch('./scripts/**/*.js', ['scripts']);

  gulp.watch(['./*.html']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
