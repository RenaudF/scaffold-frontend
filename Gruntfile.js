'use strict';

module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %> ' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
			'<%= pkg.author %>\n * Licensed <%= pkg.license %> */\n',
		// Task configuration.
		clean: {
			files: ['frontend/dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['frontend/libs/requirejs/require.js', '<%= concat.dist.dest %>'],
				dest: 'frontend/dist/require.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'frontend/dist/require.min.js'
			}
		},
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			unit: {
				singleRun: true
			},
			manual: {
				logLevel: 'DEBUG'
			}
		},
		protractor: {
			options: {
				configFile: 'protractor.conf.js',
				args: {
					params: {
						port: '<%= connect.test.options.port %>'
					}
				}
			},
			e2e: {
				options: {
					keepAlive: true
				}
			},
			manual: {
				options: {
					debug: true
				}
			}
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: 'Gruntfile.js'
			},
			frontend_app: {
				options: {
					jshintrc: 'frontend/app/.jshintrc'
				},
				src: ['frontend/app/**/*.js']
			},
			frontend_test: {
				options: {
					jshintrc: 'frontend/test/.jshintrc'
				},
				src: ['frontend/test/**/*.js']
			},
			e2e_test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/**/*.js']
			}
		},
		watch: {
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile']
			},
			frontend_app: {
				files: ['frontend/app/**/*.js'],
				tasks: ['jshint:frontend_app', 'karma:unit', 'connect:test', 'protractor:e2e']
			},
			frontend_test: {
				files: ['frontend/test/**/*.js'],
				tasks: ['jshint:frontend_test', 'karma:unit']
			},
			e2e_test: {
				files: ['test/**/*.js'],
				tasks: ['jshint:e2e_test', 'connect:test', 'protractor:e2e']
			}
		},
		requirejs: {
			compile: {
				options: {
					name: 'main',
					mainConfigFile: 'frontend/app/main.js',
					out: '<%= concat.dist.dest %>',
					optimize: 'none'
				}
			}
		},
		connect: {
			test: {
				options: {
					base: 'frontend/',
					port: 8001,
					middleware: '<%= connect.production.options.middleware %>'
				}
			},
			development: {
				options: {
					base: 'frontend/',
					keepalive: true
				}
			},
			production: {
				options: {
					base: 'frontend/',
					keepalive: true,
					port: 8000,
					middleware: function (connect, options) {
						return [
							// rewrite requirejs to the compiled version
							function (req, res, next) {
								if (req.url === '/libs/requirejs/require.js') {
									req.url = '/dist/require.min.js';
								}
								next();
							},
							connect.static(options.base),
						];
					}
				}
			},
			coverage: {
				options:{
					base: 'frontend/coverage/',
					port: 8002,
					keepalive: true
				}
			}
		},
		open: {
			preview: {
				path: 'http://localhost:<%= connect.production.options.port %>'
			},
			coverage:{
				path: 'http://localhost:<%= connect.coverage.options.port %>'
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-protractor-runner');

	// Default task.
	grunt.registerTask('default', ['jshint', 'karma:unit', 'clean', 'requirejs', 'concat', 'uglify', 'connect:test', 'protractor:e2e']);
	grunt.registerTask('preview', ['open:preview', 'connect:development']);
	grunt.registerTask('preview-live', ['default', 'open:preview', 'connect:production']);
	grunt.registerTask('test', ['karma:manual', 'connect:test', 'protractor:manual']);
	grunt.registerTask('coverage', ['open:coverage', 'connect:coverage']);
};
