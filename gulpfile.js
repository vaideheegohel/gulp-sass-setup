var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
}) 

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

gulp.task('watch', function(){
  gulp.watch('assets/scss/*.scss', gulp.series(['sass']));
  gulp.watch('assets/scss/*.scss', gulp.series(['scripts']));
  gulp.watch('assets/scss/*.scss', gulp.series(['browserSync']));
})

//run this command in your terminal: "gulp watch"
