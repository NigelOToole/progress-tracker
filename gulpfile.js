// ----- Imports and variables ------
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const browserSync = require('browser-sync');
const server = browserSync.create();
const del = require('del');
const sass = require('gulp-sass')(require('sass'));

const isProd = process.env.NODE_ENV === 'production';

const paths = {
  src: 'src',
  dest: 'docs',
  tmp: '.tmp'
};


// ----- Tasks ------
function styles() {
  return src(`${paths.src}/styles/*.scss`, {
      sourcemaps: !isProd,
    })
    .pipe($.plumber())
    .pipe(sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    })
    .on('error', sass.logError))
    .pipe(dest(`${paths.src}/styles`, {
      sourcemaps: !isProd,
    }))
    .pipe(server.reload({stream: true}));
};

exports.styles = styles;


// ----- Serve tasks ------
function startAppServer() {
  server.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: [`${paths.tmp}`, `${paths.src}`],
      routes: {
        '/node_modules': 'node_modules'
      },
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  });

  watch([`${paths.src}/*.html`]).on('change', server.reload);

  watch(`${paths.src}/**/*.scss`, styles);
}

const compile = series(clean, styles);
exports.compile = compile;

const serve = series(compile, startAppServer);
exports.serve = serve;


// ----- Build tasks ------
function moveFiles() {
  return src([`${paths.tmp}/**/*.{html,css,js}`, `${paths.src}/**/*.{html,css,js,jpg,gif,png,webp,mp4,webm}`])
    .pipe(dest(`${paths.dest}`));
};
exports.moveFiles = moveFiles;


function clean() {
  return del([`${paths.tmp}`, `${paths.dest}`])
}
exports.clean = clean;


const build = series(compile, moveFiles);
exports.build = build;
exports.default = build;
