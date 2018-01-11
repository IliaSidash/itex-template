'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    twig = require('gulp-twig'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rimraf = require('rimraf'),
    csso = require('gulp-csso'),
    plumber = require('gulp-plumber');

// Переменная с конфигом для browserSync
var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "IS",
    startPath: "/views/home/"
};


// BROWSERSYNC
gulp.task('server', function () {
    browserSync(config);
});


// TWIG
gulp.task('twig', function () {
    var g = require("./globals");
    return gulp.src('./individual/views/**/*.twig')
        .pipe(plumber())
        .pipe(twig(g.twigConfig))
        .pipe(gulp.dest('./build/views'))
        .pipe(reload({stream: true}));
});


// CSS
gulp.task('css', function(){
    return gulp.src('./individual/public/scss/**/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init({debug: true, identityMap: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/public/css'))
        .pipe(gulp.dest('./individual/public/css'))
        .pipe(reload({stream: true}))
});

// JS TASK
gulp.task('js', function(){
    return gulp.src('./individual/public/js/**/*.js')
        .pipe(gulp.dest('./build/public/js'))
        .pipe(reload({stream: true}));
});

// IMAGES TASK
gulp.task('images', function() {
    return gulp.src('./individual/public/images/**/*.*')
        .pipe(gulp.dest('./build/public/images'))
        .pipe(reload({stream: true}));
});

// FONTS TASK
gulp.task('fonts', function() {
    return gulp.src('./individual/public/fonts/**/*.*')
        .pipe(gulp.dest('./build/public/fonts'))
        .pipe(reload({stream: true}));
});

// LIBS TASK
gulp.task('libs', function () {
    return gulp.src('./individual/public/libs/**/*')
        .pipe(gulp.dest('./build/public/libs'))
        .pipe(reload({stream: true}));
});

// BUILD
gulp.task('build', gulp.parallel(
    'twig',
    'js',
    'css',
    'fonts',
    'images',
    'libs'
));

// CLEAN
gulp.task('clean', function (cb) {
    return rimraf('./build', cb)
});

// WATCH
gulp.task('watch', function(){
    gulp.watch('./individual/views/**/*.twig', gulp.series('twig'));
    gulp.watch(['./individual/public/scss/**/*.scss', './individual/public/scss/**/*.css'], gulp.series('css'));
    gulp.watch('./individual/public/js/**/*.js', gulp.series('js'));
    gulp.watch('./individual/public/images/**/*.*', gulp.series('images'));
    gulp.watch('./individual/public/fonts/**/*.*', gulp.series('fonts'));
    gulp.watch('./individual/public/libs/**/*.*', gulp.series('libs'));
});

// DEFAULT TASK
gulp.task('default', gulp.series(
    'clean',
    'build',
    gulp.parallel(
        'watch',
        'server'
    )
));

