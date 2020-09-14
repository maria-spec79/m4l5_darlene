const gulp = require ('gulp');
const {src, dest, watch, series} = require ('gulp');
const imagemin = require ('gulp-imagemin');
const spritesmith = require ('gulp.spritesmith');
const stylus = require ('gulp-stylus');
const htmlmin = require ('gulp-htmlmin');
const concatCss = require ('gulp-concat-css');
const csso = require ('gulp-csso');

function minipic(done) {
	return src('3/images/*.png')
	.pipe(imagemin())
	.pipe(dest('dist'))
	};
//exports.default = minipic;

function createsprite(done) {
    var spriteData = src('dist/*.png')
    .pipe(spritesmith({
    	imgName: 'sprite4.png',
    	imgPath: 'imgs/sprite4.png',
        cssName: 'sprite4.css',
        algorithm: "left-right",
        padding: 5
        }));

	var stylStream = spriteData.img.pipe(dest('imgs'));
	var imgStream = spriteData.css.pipe(dest('styles'));
	return (imgStream, stylStream);
};
//exports.default = createsprite;

function minihtml(done) {
	return src('3/index.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
    	removeComments: true
	}))
	.pipe(dest('dist'))
};
watch(['3/index.html'], minihtml);
//exports.default = minihtml;

function union(done) {
	return src('styles/*.css')
	.pipe(concatCss('unistyle.css'))
	.pipe(dest('3'))
};

function minicss(done) {
	return src('3/unistyle.css')
	.pipe(csso())
	.pipe(dest('dist'))
};

//exports.default = series(union, minicss);