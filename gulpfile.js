// ----- Imports and variables ------
const { src, dest, watch, series, parallel, lastRun } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
const browserSync = require('browser-sync');
const server = browserSync.create();
const del = require('del');
const { argv } = require('yargs');
const autoprefixer = require('autoprefixer');

const port = argv.port || 9000;

const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';
const isDev = !isProd && !isTest;

const paths = {
  src: 'src',
  dest: 'docs',
  tmp: '.tmp'
};


// ----- Tasks ------
function styles() {
  return src(`${paths.src}/styles/*.scss`)
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    })
    .on('error', $.sass.logError))
    .pipe($.postcss([
      autoprefixer()
    ]))
    .pipe($.if(!isProd, $.sourcemaps.write()))
    .pipe(dest(`${paths.tmp}/styles`))
    .pipe(server.reload({stream: true}));
};

exports.styles = styles;


// ----- Serve tasks ------
function startAppServer() {
  server.init({
    notify: false,
    port,
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

  watch([
    `${paths.src}/*.html`
  ]).on('change', server.reload);

  watch(`${paths.src}/**/*.scss`, styles);
}


let serve = series(clean, styles, startAppServer);
exports.serve = serve;


// ----- Build tasks ------
function compress() {
  return src([`${paths.src}/*.html`, `${paths.tmp}/*/**/*.{html,css,js}`])
    .pipe(dest(`${paths.dest}`));
}

function clean() {
  return del([`${paths.tmp}`, `${paths.dest}`])
}

exports.clean = clean;

const build = series(clean, styles, compress);

exports.build = build;
exports.default = build;
