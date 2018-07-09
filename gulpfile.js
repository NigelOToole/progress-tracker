const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['styles'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./']
    }
  });

  gulp.watch([
    'app/*.html'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
});

gulp.task('default', ['serve']);
