const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const del = require('del');
const rigger = require('gulp-rigger');
const concat = require('gulp-concat');
const webp = require('gulp-webp');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

function serve() {
  browserSync.init({
    server: {
      baseDir: './dist',
    },
  });
}

function html() {
  return src('src/**/*.html')
    .pipe(dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
}

function css() {
  return src(['src/sass/*.scss', 'src/blocks/**/*.scss'])
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true,
      },
    }))
    .pipe(rename({
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.reload({ stream: true }));
}

function js() {
  return src('src/**/*.js')
    .pipe(concat('index.js'))
    .pipe(plumber())
    .pipe(rigger())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js',
    }))
    .pipe(dest('dist/js/'))
    .pipe(browserSync.reload({ stream: true }));
}

function php() {
  return src('src/php/**/*.php')
    .pipe(dest('dist/php/'))
    .pipe(browserSync.reload({ stream: true }));
}

function images() {
  return src('src/assets/images/*.{jpg,jpeg,png,svg,gif,ico,webp,xml}')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 95, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false },
        ],
      }),
    ]))
    .pipe(webp({ quality: 100 }))
    .pipe(rename({ dirname: '' }))
    .pipe(dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
}

function fonts() {
  return src('src/assets/fonts/*.{ttf,woff2}')
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
}

  function clean() {
  return del('./dist');
}

function watchFiles() {
  gulp.watch(['src/**/*.html'], html);
  gulp.watch(['src/**/*.scss'], css);
  gulp.watch(['src/**/*.js'], js);
  gulp.watch(['src/php/**/*.php'], php);
  gulp.watch(['src/**/*.{jpg,jpeg,png,svg,gif,ico,webp,xml}'], images);
  gulp.watch(['src/assets/fonts/*.woff2'], fonts);
  gulp.watch(['src/data/*.json'], jsonData);
}

function deployGhPages() {
  return src("./dist/**/*")
    .pipe(ghPages());
}

function jsonData() {
  return src('src/data/*.json')
    .pipe(dest('dist/data'))
    .pipe(browserSync.reload({ stream: true }));
}

const build = gulp.series(clean, gulp.parallel(html, css, js, php, images, fonts, jsonData));
const watch = gulp.parallel(build, watchFiles, serve);
const deploy = gulp.series(build, deployGhPages);

exports.fonts = fonts;
exports.html = html;
exports.css = css;
exports.js = js;
exports.php = php;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.deploy = deploy;
exports.default = watch;
