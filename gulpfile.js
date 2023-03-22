const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('node-sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');

const env = process.env.NODE_ENV;


task( 'clean', () => {
    return src( 'dist/**/*', { read: false })
      .pipe( rm() )
  })


task('copy:html', () => {
    return src("src/*.html")
    .pipe(dest('dist'))
    .pipe(reload({stream:true}));
})

const styles = ['src/styles/main.scss']


task('styles', ()=> {
  return src(styles)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(px2rem({
      dpr: 1,             // base device pixel ratio (default: 2)
      rem: 16,            // root element (html) font-size (default: 16)
      one: false           // whether convert 1px to rem (default: false)
    }))
    .pipe(gulpif(env === 'dev', autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream:true }));    
});

const libs = [
  'node_modules/jquery/dist/jquery.js',
  'src/scripts/*.js'
];

task('scripts', () => {
  return src(libs)
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js'))
    .pipe(gulpif(env === 'prod', babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest('dist'))
    .pipe(reload({ stream:true }));   
 });

 task( 'icons', () => {
  return src( 'src/assets/icons/*.svg')
  .pipe(svgo({
    plugins: [
      {
        removeAttrs: {
          attrs: '(fill|stroke|style|width|hight|data).*'
        }
      }
    ]
  }))
  .pipe(svgSprite({
    mode: {
      symbol: {
        sprite: '../sprite.svg'
      }
    }
  }))
  .pipe(dest('dist/assets/icons'));
});

const img = [
  'src/assets/images/*.png',
  'src/assets/images/*.jpg'
];

task( 'images', () => {
  return src(img)
  .pipe (dest('dist/assets/images'));
});

task('server', () => {
  browserSync.init({
      server: {
          baseDir: "./dist"
      },
      open:false
  });
});

task('watch', () => {
  watch('./src/styles/**/*.scss', series('styles'));
  watch('./src/*.html', series('copy:html'));
  watch('./src/scripts/*.js', series('scripts'));
  watch('./src/assets/icons/*.svg', series('icons'));
});


task('default', 
series(
  'clean', 
  parallel ('copy:html', 'styles', 'scripts', 'icons', 'images'), 
  parallel('watch', 'server')
  )
  );

task('build', 
series(
  'clean', 
  parallel ('copy:html', 'styles', 'scripts', 'icons', 'images'))
  );