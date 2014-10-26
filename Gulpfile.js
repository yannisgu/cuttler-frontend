var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');


gulp.task('default', ['livereload', 'build', 'watch', 'serve'],function() {
});

gulp.task('build', ['html', 'vendor', 'js','hbs', 'less', 'image'],function() {
});


gulp.task('html', function() {
    gulp.src('index.html').
    pipe(plumber()).
    pipe(gulp.dest('build')).
    pipe(livereload({
					auto: false
		}));
})

gulp.task('vendor', function() {
  gulp.src(['bower_components/**/*.js','bower_components/**/*.css']).
  pipe(plumber()).
  pipe(gulp.dest('build/assets/vendor')).
  pipe(livereload({
        auto: false
  }));
})

gulp.task('js', function() {
  gulp.src('src/js/**/*.js').
  pipe(plumber()).
  pipe(concat('main.js')).
  pipe(gulp.dest('build/assets/js')).
  pipe(livereload({
        auto: false
  }));
});


gulp.task('image', function() {
  gulp.src('src/img/**/*.png').
  pipe(plumber()).
  pipe(gulp.dest('build/assets/img'))
});

gulp.task('less', function () {
  gulp.src('src/less/**/*.less').
  pipe(plumber()).
  pipe(less({
    paths: [ path.join(__dirname, 'src/less') ]
  })).
  pipe(gulp.dest('build/assets/css')).
  pipe(livereload({
        auto: false
  }));
});

var concat = require('gulp-concat');
var emberTemplates = require('gulp-ember-templates');

gulp.task('hbs', function () {
  gulp.src('src/templates/**/*.hbs')
    .pipe(plumber())
    .pipe(emberTemplates())
    .pipe(concat('templates.js')) // make sure to only do concat after
    .pipe(gulp.dest('build/assets/js'));
});



gulp.task('watch', function() {
  gulp.watch([
    'src/less/**/*.less'
	], ['less']);
  gulp.watch([
    'src/js/**/*.js'
  ], ['js']);
  gulp.watch([
    'src/img/**/*.png'
  ], ['image']);
  gulp.watch([
    'index.html'
  ], ['html'])
  gulp.watch([
    'src/templates/**/*.hbs'
  ], ['hbs']);
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

var gulp = require('gulp'),
	livereload = require('gulp-livereload');

gulp.task('livereload', function() {
	livereload.listen();
});
