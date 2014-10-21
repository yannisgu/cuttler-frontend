var gulp = require('gulp');

gulp.task('default', ['html', 'vendor', 'js'],function() {
});


gulp.task('html', function() {
    gulp.src('index.html')
    .pipe(gulp.dest('build'));
})

gulp.task('vendor', function() {
  gulp.src('bower_components/**/*.js').
  pipe(gulp.dest('build/assets/vendor'))
})

gulp.task('js', function() {
  gulp.src('js/**/*.js').
  pipe(gulp.dest('build/assets/js'))
});
