'use strict';

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const plumber = require('gulp-plumber');
const stylus = require('gulp-stylus')
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const sourcemaps = require('gulp-sourcemaps');
const minifyCss = require('gulp-minify-css');
const pug = require('gulp-pug');

gulp.task('webpack', () => {
    gulp.src('./src/scripts/entry.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./docs/assets'));
});

gulp.task('stylus', () => {
    gulp.src('./src/stylus/**/!(_)*.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(minifyCss({ advanced: false }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./docs/assets'));
});

gulp.task('pug', () => {
    gulp.src('./src/pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./docs'));
});

gulp.task('public', () => {
    gulp.src('./src/public/**/*', { base: './public' })
        .pipe(gulp.dest('./docs/assets'));
});

gulp.task('watch', () => {
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
    gulp.watch('./src/pug/**/*.pug', ['pug']);
    gulp.watch('./src/public/**/*', ['public']);
});

gulp.task('dev', ['watch', 'webpack', 'stylus', 'pug', 'public']);