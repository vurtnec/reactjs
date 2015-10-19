var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var browserify = require('browserify');  // Bundles JS.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
del = require('del');

gulp.task('uglify', function() {
    console.log("start uglify javascript");
    return gulp.src('./public/vurtnec.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/'))
});

gulp.task('js', function () {
    console.log("start uglify javascript");
    browserify(['./react/app.js'])
        .transform(reactify)
        .bundle()
        .pipe(source('vurtnec.js'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('clean', function() {
    del(['./public/vurtnec.js'])
});

gulp.task('default', ['clean'], function() {
    gulp.start('js');
});
