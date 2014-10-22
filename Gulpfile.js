var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');


gulp.task('default', ['html', 'vendor', 'js', 'less'],function() {
});


gulp.task('html', function() {
    gulp.src('index.html').
    pipe(plumber()).
    pipe(gulp.dest('build'));
})

gulp.task('vendor', function() {
  gulp.src('bower_components/**/*.js').
  pipe(plumber()).
  pipe(gulp.dest('build/assets/vendor'))
})

gulp.task('js', function() {
  gulp.src('js/**/*.js').
  pipe(plumber()).
  pipe(gulp.dest('build/assets/js'))
});


gulp.task('less', function () {
  gulp.src('src/less/**/*.less').
  pipe(plumber()).
  pipe(less({
    paths: [ path.join(__dirname, 'src/less') ]
  })).
  pipe(gulp.dest('build/assets/css'));
});


gulp.task('watch', function() {
  gulp.watch([
    'src/less/**/*.less'
	], ['less']);
  gulp.watch([
    'src/js/**/*.js'
  ], ['js']);
  gulp.watch([
    'index.html'
  ], ['html'])
  gulp.watch([
    'src/templates/**/*.hbs'
  ], ['templates']);
});

var exec = require('child_process').exec,
	connect = require('connect'),
	connectLivereload = require('connect-livereload'),
	connectServeStatic = require('serve-static'),
	http = require('http'),
	open = require('open');

gulp.task('serve', function() {
	var app = connect()
			.use(connectLivereload())
			.use(connectServeStatic('build')),
		server = http.createServer(app).listen(9000);

	server.on('listening', function() {
		open('http://localhost:9000');
	});

	// Clean on exit
	process.on('SIGINT', function() {
		exec('gulp clean', function() {
			process.exit(0);
		});
	});
});
