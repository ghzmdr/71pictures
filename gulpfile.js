var path = require("path");
var gulp = require("gulp");
var gutil = require("gulp-util");
var zip = require("gulp-zip");
var webpack = require("webpack");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var webpackDevConfig = {
	entry: path.join(__dirname, 'src/js/main.js'),
	output: {
		path: path.join(__dirname, "assets/js/"),
		filename: "[name].js"
	},

	devtool: '#inline-source-map',

	module: {
		rules: [
			{
			  test: /\.js$/,
			  exclude: /(node_modules)/,
			  use: {
			    loader: 'babel-loader',
			    options: {
			      presets: [['env', { debug: false }]]
			    }
			  }
			}
		]
	}
};

var webpackProdConfig = {
	entry: path.join(__dirname, 'src/js/main.js'),
	output: {
		path: path.join(__dirname, "assets/js/"),
		filename: "[name].js"
	},

	module: {
		rules: [
			{
			  test: /\.js$/,
			  exclude: /(node_modules)/,
			  use: {
			    loader: 'babel-loader',
			    options: {
			      presets: [['env', { debug: false }]]
			    }
			  }
			}
		]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin()
	]
};

gulp.task("webpack:dev", function(callback) {
    
    webpack(webpackDevConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });

});

gulp.task("webpack:prod", function(callback) {
    
    webpack(webpackProdConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        callback();
    });

});

gulp.task('sass:dev', function () {

	return gulp.src('./src/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css/'));

});

gulp.task('sass:prod', function () {

	return gulp.src('./src/scss/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest('./assets/css/'));

});

gulp.task('develop', ['webpack:dev', 'sass:dev'], function () {
	gulp.watch('./src/js/**/*.js', ['webpack:dev']);
	gulp.watch('./src/scss/**/*.scss', ['sass:dev']);
})

gulp.task('release', ['webpack:prod', 'sass:prod'], function () {
	
	var date = new Date().toString();
	var dateRegex = /^([A-z]+\s)+(.*)(\sGMT.+)$/;
	var dateString = dateRegex.exec(date)[2];
	var dateString = dateString.replace(/\s|:/g, '_');
	console.log(dateString);

	gulp.src(['./assets/**/*', './inc/**/*', './*.php', './style.css'])
		.pipe(zip('71pictures_' + dateString + '.zip'))
		.pipe(gulp.dest('./releases'))
})
