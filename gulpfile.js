'use strict'

const gulp = require('gulp'), 
    concat = require('gulp-concat'),
      maps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

//Combines the three js files located in the /js and /js/circle folders in to /js/apps.js
gulp.task('concatScripts', function() {
        gulp.src([
                'js/global.js',
                'js/circle/autogrow.js',
                'js/circle/circle.js'
        ])
        // sourcemaps is used to help id erros in original non-minified js files
        .pipe(maps.init())
        //name of newly created js file
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        //destination directory
        .pipe(gulp.dest('js'));
});

//minify the app.js file after it has been created in the concat
gulp.task('minifyScripts', ["concatScripts"], function () {
        return gulp.src('js/app.js')
        //minifys js files
        .pipe(uglify())
        //app.js is renamed to app.min.js insted of overwriting
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
        return gulp.src("scss/application.scss")
                .pipe(maps.init())
                .pipe(sass())
                .pipe(maps.write('./'))
                .pipe(gulp.dest('css'));
});



gulp.task('default');