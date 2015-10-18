var gulp = require('gulp');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var reactify = require('reactify');
var react = require('gulp-react');

gulp.task('concat', function() {
    console.log("start concat javascript");
    return gulp.src('./react/**/*.js')
        .pipe(concat('vurtnec.js'))
        .pipe(gulp.dest('./public/'))
});


gulp.task('default', function () {
    return gulp.src('./react/**/*.js')
        .pipe(react())
        .pipe(concat('vurtnec.js'))
        .pipe(gulp.dest('./public'));
});

//gulp.task('default', ['js']);