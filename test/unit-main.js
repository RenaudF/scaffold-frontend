/* global window, requirejs */

var tests = [];
for (var file in window.__karma__.files) {
	if (window.__karma__.files.hasOwnProperty(file)) {
		if (/unit\.js$/.test(file)) {
			tests.push(file);
		}
	}
}

requirejs.config({
	// Karma serves files from '/base'
	baseUrl: '../base/app',
	paths: {
		"libs": "../base/bower_components"
	},

	// ask Require.js to load these files (all our tests)
	deps: tests,

	callback: window.__karma__.start
});