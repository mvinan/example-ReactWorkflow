// Browserify modules, transform jsx and ES6
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var source       = require('vinyl-source-stream');
var babelify     = require('babelify');
var watchify     = require('watchify');
var exorcist     = require('exorcist');
var browserify   = require('browserify');
var browserSync  = require('browser-sync').create();

//Sass modules
var sass         = require('gulp-sass');
var reload       = browserSync.reload;
var concatCss    = require('gulp-concat-css');
var CleanCSS     = require('clean-css');
var autoprefixer = require('gulp-autoprefixer');
var map          = require('vinyl-map');

//Gulp injected
var inject       = require('gulp-inject');


var src = {
    sass: './src/importer.sass',
    sassAll: 'app/**/*.sass',
    css:  'public/styles/',
    html: 'public/*.html'
};

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./src/app.jsx', watchify.args));

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: './src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JSX...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('public/js/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

/**
 * First bundle, then serve from the ./public directory
 */
gulp.task('default', ['bundle', 'inject', 'styles'], function () {
    browserSync.init({
        server: "./public"
    });

    //watch sass files
    gulp.watch([src.sass], ['styles']);
    gulp.watch([src.sassAll], ['inject']);
    gulp.watch(src.html).on('change', reload);
});


/*
 * Compile Sass files
 */

gulp.task('styles', function() {

  var minify = map(function (buff, filename) {
    return new CleanCSS({
    }).minify(buff.toString()).styles;
  });

  gutil.log('Compiling SASS...');

  return gulp.src(src.sass)
    .pipe(sass({
      outputStyle: 'compressed',
      noCache: true
    }).on('error', sass.logError))
    .pipe(concatCss('styles.css'))
    .pipe(autoprefixer({
      cascade: true
    }))
    .pipe(minify)
    .pipe(gulp.dest(src.css))
    .pipe(reload({stream: true}));
});

/*
 * Inject Files
 */

gulp.task('inject', function () {
  var target = gulp.src('src/importer.sass');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['app/**/*.sass',      'app/**/*.scss'], {read: false});

  gutil.log('Injecting files…');

  return target.pipe(inject(sources, {relative: true, empty: true}))
    .pipe(gulp.dest('src'))
    .pipe(reload({stream: true}))
});
