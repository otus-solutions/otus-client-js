(function() {

    var gulp = require('gulp');
    var bump = require('gulp-bump');
    var uglify = require("gulp-uglify");
    var minify = require('gulp-minify');
    var concat = require('gulp-concat');
    var sonar = require('gulp-sonar');
    var packageJson = require('./package.json');

    gulp.task('upgrade-version', function(value) {
        gulp.src('./package.json')
            .pipe(bump({
                version: process.env.npm_config_value
            }))
            .pipe(gulp.dest('./'));
    });

    gulp.task('compress', function() {
        gulp.src('app/**/*.js')
            .pipe(concat('otus-client.js'))
            .pipe(minify({
                'mangle': false
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('sonar', function() {
      var options = {
        sonar: {
          host: {
            url: process.env.npm_config_sonarUrl,
          },
          login: process.env.npm_config_sonarDatabaseUsername,
          password: process.env.npm_config_sonarDatabasePassword,
          projectKey: 'sonar:otus-client-js',
          projectName: 'otus-client-js',
          projectVersion: packageJson.version,
          sources: 'app',
          language: 'js',
          sourceEncoding: 'UTF-8',
          exec: {
            maxBuffer: 1024 * 1024
          },
          javascript: {
            lcov: {
              reportPath: 'target/test-coverage/report-lcov/lcov.info'
            }
          }
        }
      };

    return gulp.src('thisFileDoesNotExist.js', {
        read: false
      })
      .pipe(sonar(options));
  });

}());
