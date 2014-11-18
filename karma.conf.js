
module.exports = function (config) {
	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '.',

		// frameworks to use
		frameworks: [
			'requirejs',
			'mocha-debug',
			'mocha',
			'chai',
			'chai-as-promised',
			'sinon-chai'
		],

		// list of files / patterns to load in the browser
		files: [
			{pattern: 'libs/**/*.js', included: false},
			{pattern: 'app/**/*.js', included: false},
			{pattern: 'test/**/*unit.js', included: false},
			 'test/unit-main.js'
		],

		preprocessors: {
			'app/**/*.js': 'coverage'
		},

		coverageReporter: {
			reporters: [
				{type : 'text'},
				{type: 'html', dir: 'coverage/'}
			]
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['spec', 'coverage'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		browsers: ['Chrome'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 60000
	});
};
