const {src, dest, watch, parallel, series} = require('gulp');

//! Підключення модулів :

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browsersync = require('browser-sync').create(); 

//! Шляхи до фаЙлів в проекті :

const paths = {
	styles: {
		src: 'app/scss/main.scss',
		dest: 'dist/css/'
	},

	html: {
		src: 'app/index.html',
		dest: 'dist/'
	},

	js: {
		src: 'app/script.js',
		dest: 'dist/'
	}
}


//! Компіляція з scss-файлу в css-файл в папку dist :

function styles() {
   return src(paths.styles.src)
	.pipe(scss({outputStyle: 'compressed'}).on('error', scss.logError))
	.pipe(concat('main.min.css'))
	.pipe(dest(paths.styles.dest))
	.pipe(browsersync.stream())
}

//! Компіляція нового index.html файлу в папку dist :

function html() {
	return src(paths.html.src)
		.pipe(dest(paths.html.dest))
}

//! Компіляція нового script.js файлу в папку dist :

function js() {
	return src(paths.js.src)
		.pipe(dest(paths.js.dest))
}

//! фунція запуску лайвсервера : 

function liveServer() {
	browsersync.init({
		server: {
			baseDir: './dist'
		},
		notify: false
	})
}

//! функція спостереження за Файлами :

function watching() {
	watch(paths.styles.src, styles);
	watch(paths.html.src, html).on('change', browsersync.reload);
	watch(paths.js.src, js)
}

exports.styles = styles;
exports.liveServer = liveServer;
exports.watching = watching;
exports.html = html;
exports.js = js;

exports.default = series( styles, html, js, parallel(liveServer, watching));