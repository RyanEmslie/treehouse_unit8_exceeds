'use strict'

const gulp = require('gulp'), 
    concat = require('gulp-concat'),
      maps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
 minifyCss = require('gulp-minify-css');

//Combines the three js files located in the /js and /js/circle folders in to /js/apps.js
gulp.task('scripts', () => {
        gulp.src([
                'js/global.js',
                'js/circle/autogrow.js',
                'js/circle/circle.js'
        ])
        // sourcemaps is used to help id erros in original non-minified js files
        .pipe(maps.init())
        //name of newly created js file
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(maps.write('./'))
        .pipe(rename('all.min.js'))
        //destination directory
        .pipe(gulp.dest('dist/js'));
});

//minify the app.js file after it has been created in the concat
// gulp.task('minifyScripts', ["scripts"], () => {
//         return gulp.src('js/app.js')
//         //minifys js files
//         .pipe(uglify())
//         //app.js is renamed to app.min.js insted of overwriting
//         .pipe(rename('all.min.js'))
//         .pipe(gulp.dest('dist/js'));
// });

//compliles all global.scss file
gulp.task('styles', () => {
        return gulp.src("sass/global.scss")
                .pipe(maps.init() )
                .pipe(sass() )
                .pipe(minifyCss() )
                .pipe(maps.write('./') )
                .pipe(rename('all.min.css'))
                .pipe(gulp.dest('dist/css') );
});

gulp.task('watchSass', () => {
        gulp.watch('sass/**/*.scss', ['styles'])
})




gulp.task('build', ['minifyScripts', 'styles'], () =>{
        return gulp.src(['css/all.min.css', 'js/all.min.js','index.html', "images/**"], { base: './'})
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['build']);