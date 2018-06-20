
var gulp = require('gulp'),
		watch = require('gulp-watch'),
		exec = require('child_process').exec;

 var mocha = require('gulp-mocha');
var gutil = require('gulp-util');

gulp.task('default', function() {
		console.log('Now watching files for test running...');
		return gulp.watch(['./**/*.js', 
						'../../Models/**/*.js',
						'../../Controllers/**/*.js',
						'../../*tasks.js',
						'../../std-library.js',
						'../../routes.js',
						'../../mongo-attachments.js'
						], gulp.series(['mocha']));
});

gulp.task('mocha', function() {
		let reporter = process.argv[2] ? process.argv[2].replace('--', '') : 'spec'
		let date = new Date();
		return exec( `clear`, (err, stdout, stderr) => {
			if(err) {console.log(err);}
			console.log(stderr);  
			console.log(stdout);
			console.log('Testing on: '+ date);
			return process.nextTick(function() {
				return gulp.src(['./specs/*.spec.js'], { read: false })
					.pipe(mocha({ reporter: reporter}))//spec, nyan, min
					.on('error', gutil.log);
			})
		})
});