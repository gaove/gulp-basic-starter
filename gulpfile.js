var gulp = require('gulp')
	,imagemin = require('gulp-imagemin')
	,clean = require('gulp-clean')
	,usemin = require('gulp-usemin')
	,uglify = require('gulp-uglify')
	,cssmin = require('gulp-cssmin')
	,autoprefixer = require('gulp-autoprefixer')
	,browserSync = require('browser-sync')
	,jshint = require('gulp-jshint')
	,jshintSlylish = require('jshint-stylish')
	,csslint = require('gulp-csslint');

gulp.task('default',['copy-folder'], function(){
	gulp.start('optimize-img', 'usemin');
});

gulp.task('clean-folder',['clean'], function(){
	return gulp.src('dist')
		.pipe(clean());
});

gulp.task('copy-folder', function(){
	return gulp.src('src/**/*')
		.pipe(gulp.dest('dist'));
});

gulp.task('optimize-img', function(){
	gulp.src('dist/assets/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets/img'));
});

gulp.task('usemin', function(){
	gulp.src('dist/**/*.html')
		.pipe(usemin({
			'js' : [uglify],
			'css' : [autoprefixer,cssmin]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('server',function(){

	browserSync.init({
		server:{
			baseDir: 'src'
		}
	});

	gulp.watch('src/js/*.js').on('change', function(event){
			gulp.src(event.path)
				.pipe(jshint())
				.pipe(jshint.reporter(jshintSlylish));
	});

	gulp.watch('src/css/*.css').on('change', function(event){
			gulp.src(event.path)
				.pipe(csslint())
				.pipe(csslint.reporter());
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);

});


































	


