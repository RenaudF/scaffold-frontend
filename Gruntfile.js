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
				src: ['libs/requirejs/require.js', '<%= concat.dist.dest %>'],
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
			app: {
				files: ['app/**/*.js'],
				tasks: ['jshint:app', 'karma:unit', 'connect:test']
			},
			test: {
				files: ['test/**/*.js'],
				tasks: ['jshint:test', 'karma:unit']
			}
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
					base: '.',
					port: 8001,
					middleware: '<%= connect.production.options.middleware %>'
				}
			},
			development: {
				options: {
					base: '.',
					port: '<%= connect.production.options.port %>',
					keepalive: true
				}
			},
			production: {
				options: {
					base: '.',
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
					base: 'coverage/',
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

	// Default task.
	grunt.registerTask('default', ['jshint', 'karma:unit', 'clean', 'requirejs', 'concat', 'uglify']);
	grunt.registerTask('preview', ['open:preview', 'connect:development']);
	grunt.registerTask('preview-live', ['default', 'open:preview', 'connect:production']);
	grunt.registerTask('test', ['karma:manual']);
	grunt.registerTask('coverage', ['open:coverage', 'connect:coverage']);
};
