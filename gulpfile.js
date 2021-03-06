var path = require("path");
var gulp = require("gulp");
var gutil = require("gulp-util");
var zip = require("gulp-zip");
var webpack = require("webpack");
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var gap = require('gulp-append-prepend');

var webpackDevConfig = {
    entry: path.join(__dirname, 'src/js/main.js'),
    output: {
        path: path.join(__dirname, "assets/js/"),
        filename: "[name].js"
    },

    devtool: '#inline-source-map',


    module: {

        rules: [
            { test: /backbone\.js$/, loader: 'imports-loader?define=>false' },
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

    resolve: {
        modules: [path.resolve(__dirname, "src", "js"), "node_modules"],
        alias: {
          'underscore': 'lodash'
        },
    },

    plugins: [
        new webpack.IgnorePlugin(/^jquery$/)
    ]
};

var webpackProdConfig = {
    entry: path.join(__dirname, 'src/js/main.js'),
    output: {
        path: path.join(__dirname, "assets/js/"),
        filename: "[name].js"
    },

    resolve: {
        modules: [path.resolve(__dirname, "src", "js"), "node_modules"],
        alias: {
          'underscore': 'lodash'
        },
    },

    module: {
        rules: [
            { test: /backbone\.js$/, loader: 'imports-loader?define=>false' },
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
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.IgnorePlugin(/^jquery$/)
    ]
};

gulp.task("webpack:dev", function(callback) {

    webpack(webpackDevConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString());
        browserSync.reload();
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
        .pipe(gap.prependFile('theme-header.txt'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());

});

gulp.task('sass:prod', function () {

    return gulp.src('./src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gap.prependFile('theme-header.txt'))
        .pipe(gulp.dest('./'));


});

gulp.task('develop', ['webpack:dev', 'sass:dev'], function () {

    browserSync.init({
        proxy   : "71pictures.localhost"
    });

    gulp.watch('./src/js/**/*.js', ['webpack:dev']);
    gulp.watch('./src/scss/**/*.scss', ['sass:dev']);

})

gulp.task('release', ['webpack:prod', 'sass:prod'], function () {

    var date = new Date().toString();
    var dateRegex = /^[A-z]+\s(.*)(\sGMT.+)$/;
    var dateString = dateRegex.exec(date)[1];
    var dateString = dateString.replace(/\s|:/g, '_');

    console.log(`\n\n   Making release: || ${dateString} ||\n\n`);

    gulp.src(['assets/**/*', 'inc/**/*', 'parts/**/*', '*.php', 'style.css'], { base: './' })
        .pipe(zip('71pictures_' + dateString + '.zip'))
        .pipe(gulp.dest('./releases'))
})
