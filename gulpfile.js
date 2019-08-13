'use strict';

var gulp = require("gulp"),
    plumber = require("gulp-plumber"),
    watch = require('gulp-watch'),
    debug = require('gulp-debug'),
    sm = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    include = require('gulp-include'),
    rigger = require('gulp-rigger'),
    /* Preprocessor */
    babel = require('gulp-babel'),
    pug = require("gulp-pug"),
    sass = require("gulp-sass"),
    // Minification
    cssmin = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    // SVG Sprite
    svg = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload;

var path = {
    src: {
        // html: './dev/pug/*.pug',
        html: './dev/*.html',
        css: {
            app: './dev/assets/scss/app.scss',
            vendor: './dev/assets/scss/vendor.scss'
        },
        js: {
            app: './dev/assets/js/app.js',
            vendor: './dev/assets/js/vendor.js',
        },
        images: {
            base: {
                jpg: './dev/assets/images/**/*.jpg',
                png: './dev/assets/images/**/*.png',
                svg: './dev/assets/images/**/*.svg'
            },
            jqueryui: './node_modules/jquery-ui/themes/base/images/*.png',
            fancybox: './node_modules/fancybox/dist/img/*.*',
            slick: './node_modules/slick-carousel/slick/ajax-loader.gif',
            svg: './dev/assets/svg/**/*.svg'
        },
        fonts: {
            fa: './node_modules/font-awesome/fonts/*.*',
            slick: './node_modules/slick-carousel/slick/fonts/*.*'
        }
    },
    dist: {
        html: './www/',
        css: './www/assets/css/',
        js: './www/assets/js/',
        images: './www/assets/images/',
        svg: './www/assets/images/svg/',
        fonts: {
            fa:  './www/assets/webfonts/',
            slick: './www/assets/css/fonts/'
        }
    }
}

/**  PRECOMPILE TASK  **/

gulp.task('babel:vendor', () =>
    gulp.src(path.src.js.vendor)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(sm.init())
        .pipe(babel({
            presets: ['latest']
        }))
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(sm.write('./'))
        .pipe(gulp.dest(path.dist.js))
);

gulp.task('css:vendor', () =>
    gulp.src(path.src.css.vendor)
        .pipe(plumber())
        .pipe(sm.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cssmin())
        .pipe(sm.write('./'))
        .pipe(gulp.dest(path.dist.css))
);

gulp.task('fonts:fa', function() {
    return gulp.src(path.src.fonts.fa)
        .pipe(gulp.dest(path.dist.fonts.fa));
});

gulp.task('fonts:slick', function () {
    return gulp.src(path.src.fonts.slick)
        .pipe(gulp.dest(path.dist.fonts.slick));
});

gulp.task('images', function() {
    return gulp.src([
        path.src.images.base.jpg,
        path.src.images.base.png,
        path.src.images.base.svg,
        path.src.images.jqueryui,
        path.src.images.fancybox,
        path.src.images.slick
    ]).pipe(gulp.dest(path.dist.images));
});

gulp.task('babel', function() {
    return gulp.src(path.src.js.app)
        .pipe(plumber())
        .pipe(sm.init())
        .pipe(babel({
            presets: ['latest']
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(sm.write('./'))
        .pipe(gulp.dest(path.dist.js))
});

gulp.task('sass', function() {
    return gulp.src(path.src.css.app)
        .pipe(plumber())
        .pipe(sm.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cssmin())
        .pipe(sm.write('./'))
        .pipe(gulp.dest(path.dist.css))
        .pipe( browserSync.stream() );
});

// gulp.task('pug', () =>
// 	gulp.src(path.src.html)
//         .pipe(plumber())
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest(path.dist.html))
// );

gulp.task('html:build', function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html))
        .pipe( browserSync.stream() );
});

gulp.task('svg', function() {
    return gulp.src(path.src.images.svg)
        .pipe(plumber())
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(svg({
            layout: 'diagonal',
            mode: {
                symbol: {
                    sprite: "../sprite.symbol.svg",
                },
                css: {
                        dest: './',
                        dimensions: '-x',
                        sprite: './sprite.css.svg',
                    render: {
                        css: true
                    }
                }
            }
        }))
        .pipe(gulp.dest(path.dist.svg));
});

gulp.task('build', gulp.series(
    'fonts:slick',
    'fonts:fa',
    'html:build',
    'sass',
    'svg',
    'babel',
    'images'
));

gulp.task('watch', function()  {
        watch(path.src.js.app, gulp.series('babel'));
		watch(path.src.js.vendor, gulp.series('babel:vendor'));
        watch(path.src.css.app, gulp.series('sass'));
        watch(path.src.css.vendor, gulp.series('css:vendor'));
        watch(path.src.html, gulp.series('html:build'));
        // watch('./dev/pug/**/*', gulp.series('pug'));
        watch([
            path.src.images.base.jpg,
            path.src.images.base.png
        ], gulp.series('images'));
        watch(path.src.images.svg, gulp.series('svg'));
	}
)
gulp.task('server', function() {
     return   browserSync.init({
        server: 'www'
    });
});


gulp.task('default', gulp.series('build', gulp.parallel('watch', 'server')));