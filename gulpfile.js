"use strict";

const gulp = require("gulp"),
  concat = require("gulp-concat"),
  maps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  minifyCss = require("gulp-minify-css"),
  imagemin = require("gulp-imagemin"),
  del = require("del"),
  sequence = require("run-sequence"),
  connect = require("gulp-connect");

//Combines the three js files located in the /js and /js/circle folders in to /js/apps.js
gulp.task("scripts", () => {
  gulp
    .src(["js/global.js", "js/circle/autogrow.js", "js/circle/circle.js"])
    // sourcemaps is used to help id erros in original non-minified js files
    .pipe(maps.init())
    //name of newly created js file
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(maps.write("./"))
    .pipe(rename("all.min.js"))
    //destination directory
    .pipe(gulp.dest("dist/scripts"));
});

//compliles all global.scss file
gulp.task("styles", () => {
  return gulp
    .src("sass/global.scss")
    .pipe(maps.init())
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(maps.write("./"))
    .pipe(rename("all.min.css"))
    .pipe(gulp.dest("dist/styles"));
});

gulp.task("watchSass", () => {
  gulp.watch("sass/**/*.scss", ["styles"]);
});

gulp.task("images", () => {
  return gulp
    .src("images/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/content"));
});

gulp.task("clean", () => {
  return del("dist");
});

gulp.task("connect", () => {
  connect.server({ port: 3000 });
});

gulp.task("build", () => {
  sequence("clean", ["scripts", "styles", "images"]);
});

gulp.task("default", () => {
  sequence(["build"], ["watchSass"],["connect"]);
});
