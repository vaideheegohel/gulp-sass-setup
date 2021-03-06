var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var cssnano = require('gulp-cssnano');

gulp.task('sass', function(){
  return gulp.src('assets/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task("scripts", function() {
  gulp.src("assets/js/*.js")
  .pipe(concat("all.js"))
  .pipe(uglify())
  .pipe(gulp.dest("js/"));
});

gulp.task('cssnano', function() {
    return gulp.src('css/main.css')
        .pipe(cssnano())
        .pipe(gulp.dest('cssnano'));
});

gulp.task('fonts', function() {
  return gulp.src('assets/fonts/*')
  .pipe(gulp.dest('fonts'))
})

gulp.task('watch', function(){
  browserSync.init({
        server: {
            baseDir: "./"
        }
    });
  gulp.watch('assets/scss/**/*.scss', gulp.series(['sass']));
  gulp.watch('assets/js/*.js', gulp.series(['scripts']));
  gulp.watch('css/main.css', gulp.series(['cssnano']));
  gulp.watch('assets/fonts/*', gulp.series(['fonts']));
  gulp.watch('*', browserSync.reload );
})

gulp.task('default', function(){
  console.log("You Should Run : gulp watch");
})
