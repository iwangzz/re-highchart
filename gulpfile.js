const gulp = require('gulp'),
    sass  = require('gulp-sass'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream');

gulp.task('sass', function() {
    gulp.src('./src/sass/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('script:build', function() {
    browserify('src/js/index.js')
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['sass', 'script:build']);