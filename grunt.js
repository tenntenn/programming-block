/*global module:false*/
module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-requirejs');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-shell');

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
				' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		requirejs: {
			baseUrl: ".",
			paths: {
				"almond":"lib/almond",
				"pb":"src/js/pb"
			},
			include: [
				"almond",
				"pb/main"
			],
			exclude: [],
			out: "src/js/<%= pkg.name %>.js",
			wrap: {
				startFile: "src/js/wrap/wrap.start",
				endFile: "src/js/wrap/wrap.end"
			},
			skipModuleInsertion: false,
			optimizeAllPluginResources: true,
			findNestedDependencies: true
		},
		lint: {
			files: [
				'src/js/pb/*.js',
				'src/js/pb/model/*.js'
				//'test/sepc/*.js'
			]
		},
		min: {
			dist: {
				src: ['<banner:meta.banner>','<config:requirejs.out>'],
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		},
		shell: {
			test: {
				command: 'mocha-phantomjs -R spec test/*.html',
				stdout: true
			},
			go: {
				command: 'go build src/webserver.go -o dist/webserver',
				stdout: true
			},
			copy: {
				command: 'sh copy.sh',
				stdout: true
			}
		},
		watch: {
			files: '<config:lint.files>',
			tasks: 'default'
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			},
			globals: {
				"console":true,
				"pb": true,
				"sb": true,
				"ko": true,
				"define": true
			}
		},
		yuidoc: {
			compile: {
				"name": '<%= pkg.title || pkg.name %>',
				"description": '<%= pkg.description %>',
				"version": '<%= pkg.version %>',
				"logo": '../img/logo.png',
				"url": '<%= pkg.homepage %>',
				options: {
					paths: '<config:requirejs.baseUrl>',
					outdir: 'docs',
					blockHelper: true
				}
			}
		}
	});

	// Create API documnet
	grunt.registerTask('doc', 'yuidoc');

	// Test with mocha-phantomjs
	grunt.registerTask('test', 'shell:test');

	// Go build
	grunt.registerTask('go', 'shell:go');

	// Default task.
	grunt.registerTask('default', 'lint requirejs min test');

	// all task
	grunt.registerTask('all', 'default doc go copy');
};
