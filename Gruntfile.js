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
			files: ['dist']
		},
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['bower_components/requirejs/require.js', '<%= concat.dist.dest %>'],
				dest: 'dist/require.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/require.min.js'
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
			app: {
				options: {
					jshintrc: 'app/.jshintrc'
				},
				src: ['app/**/*.js']
			},
			test: {
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
			src: {
				files: ['app/**/*.js'],
				tasks: ['jshint:src', 'karma:unit', 'protractor:e2e']
			},
			test: {
				files: ['test/**/*.js'],
				tasks: ['jshint:test', 'karma:unit', 'protractor:e2e']
			},
		},
		requirejs: {
			compile: {
				options: {
					name: 'main',
					mainConfigFile: 'app/main.js',
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
					keepalive: true
				}
			},
			production: {
				options: {
					keepalive: true,
					port: 8000,
					middleware: function (connect, options) {
						return [
							// rewrite requirejs to the compiled version
							function (req, res, next) {
								if (req.url === '/bower_components/requirejs/require.js') {
									req.url = '/dist/require.min.js';
								}
								next();
							},
							connect.static(options.base),
						];
					}
				}
		},
		open: {
			preview: {
				path: 'http://localhost:<%= connect.development.options.port %>'
			},
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
};
