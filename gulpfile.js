const gulp = require ('gulp');
const {src, dest, watch, series} = require ('gulp');
const imagemin = require ('gulp-imagemin');
const spritesmith = require ('gulp.spritesmith');
const stylus = require ('gulp-stylus');
const htmlmin = require ('gulp-htmlmin');
const concatCss = require ('gulp-concat-css');
const csso = require ('gulp-csso');

function minipic(done) {
	return src('src/images/*.png')
	.pipe(imagemin())
	.pipe(dest('dist/images'))
	};
exports.minipic = minipic;

function createsprite(done) {
    let spriteData = src('dist/images/*.png')
    .pipe(spritesmith({
    	imgName: 'sprite_pic.png',
    	imgPath: 'dist/images/sprite_pic.png',
        cssName: 'sprite_pic.css',
        algorithm: "left-right",
        padding: 5
        }));

	let stylStream = spriteData.img.pipe(dest('dist/images'));
	let imgStream = spriteData.css.pipe(dest('src'));
	return (imgStream, stylStream);
};
exports.createsprite = createsprite;

function minihtml(done) {
	return src('src/index.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
    	removeComments: true
	}))
	.pipe(dest('./'))
};
//watch(['src/index.html'], minihtml);
exports.minihtml = minihtml;

function union(done) {
	return src('src/*.css')
	.pipe(concatCss('unistyle.css'))
	.pipe(dest('dist'))
};

function minicss(done) {
	return src('dist/unistyle.css')
	.pipe(csso())
	.pipe(dest('./'))
};

exports.default = series(union, minicss);