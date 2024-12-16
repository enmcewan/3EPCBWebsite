var gulp = require('gulp');
var plumber = require('gulp-plumber');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-dart-sass');
var clean = require('gulp-clean');
var browserSync = require('browser-sync').create();
var rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
var htmlreplace = require('gulp-html-replace');
var reload = browserSync.reload;
// Configuration file to keep your code DRY
var cfg = require('./gulpconfig.json');
var paths = cfg.paths;

// Using Date for CSS Versioning. Limited to going down to hours...with mins and seconds the build process in not quick enough for names to match.
var date = new Date();
var yrmndthr = `theme.${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}`;

gulp.task('dist-assets', function (done) {
  gulp.src('./src/js/**.*')
    .pipe(gulp.dest('./dev/js'));
  gulp.src('./src/img/**.*')
    .pipe(gulp.dest('./dev/img'));
  gulp.src('./src/fonts/**.*')
    .pipe(gulp.dest('./dev/fonts'));
  done();
});

gulp.task('prod-copy', function (done) {
  gulp.src('./dev/**/**.*')
    .pipe(gulp.dest('./public/'));
  done();
});

gulp.task('minify-css', () => {
  return gulp
    .src('dev/css/*.css')
    .pipe(cleanCSS({
      compatibility: '*'
    }))
    .pipe(rename({
      basename: `${yrmndthr}`,
      suffix: '.min'
    }))
    .pipe(gulp.dest('dev/css'))
    .pipe(browserSync.stream());
});

// minifies HTML
gulp.task('minify-html', () => {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(gulp.dest('public'));
});


// Purging unused CSS
gulp.task('purgecss', () => {
  return gulp.src(`public/css/${yrmndthr}.min.css`)
    .pipe(purgecss({
      content: ['public/**/*.html'],
      safelist: ['collapsed', 'collapse', 'active', 'show', 'collapsing']
    }))
    .pipe(gulp.dest('public/css'))
})

gulp.task('clean-public', function () {
  return gulp.src('public', {
    read: false,
    allowEmpty: true
  })
    .on('error', function (err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(clean());
});

gulp.task('clean-dev', function () {
  return gulp.src('dev', {
    read: false,
    allowEmpty: true
  })
    .on('error', function (err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(clean());
});

gulp.task('clean', function () {
  return gulp.src('dev/scss', {
    read: false
  })
    .on('error', function (err) {
      console.log(err.toString());

      this.emit('end');
    })
    .pipe(clean());
});

gulp.task('browser-sync', function (done) {
  browserSync.init({
    server: {
      baseDir: "./dev"
    }
  });
  gulp.watch("dev/**/*.*").on('change', browserSync.reload);
});

// Compile sass to css
gulp.task('sass', function () {
  return gulp.src('src/scss/theme.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dev/css'))
});

gulp.task('inject-min-css', function (done) {
  gulp.src('./public/**/*.html')
    .pipe(htmlreplace({
      'css': `/css/${yrmndthr}.min.css`
    }))
    .pipe(gulp.dest('./public'));
  done();
});

// Why doesn't the following function run? Can't find a place where 

// gulp.task('inject-min-css-php', function (done) {
//   gulp.src('./public/**/*.php')
//     .pipe(htmlreplace({
//       'css': `/css/${yrmndthr}.min.css`
//     }))
//     .pipe(gulp.dest('./public'));
//   done();
// });

////////////////// All Bootstrap SASS  Assets /////////////////////////
gulp.task('copy-assets', function (done) {
  ////////////////// All Bootstrap 5 Assets /////////////////////////
  // Copy all JS files
  var stream = gulp
    .src(paths.node + '/bootstrap/dist/js/**/*.*')
    .pipe(gulp.dest(paths.dev + '/js'));

  // Copy all Bootstrap SCSS files
  gulp
    .src(paths.node + '/bootstrap/scss/**/*.scss')
    .pipe(gulp.dest(paths.dev + '/scss/assets/bootstrap'));

  ////////////////// End Bootstrap 4 Assets /////////////////////////

  done();
});