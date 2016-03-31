// http://gruntjs.com/configuring-tasks

module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			html: {
				expand: true,
				flatten: true,
				src: [
					'src/index.html'
				],
    			dest: 'dist/'
			},
			js: {
				expand: true,
				flatten: true,
				src: [
					'src/js/app.js', 'src/js/jquery.leanModal.js', 'src/js/wow.min.js'
				],
    			dest: 'dist/js/'
			},					
			css: {
				expand: true,
				flatten: true,
				src: [
					'src/css/piatto.css', 'src/css/app.css', 'src/css/animate.css'
				],
    			dest: 'dist/css/'
			},
			assets: {
				expand: true,
				flatten: true,
				src: [
					'src/assets/*.*'
				],
    			dest: 'dist/assets/'
			},							
			fonts: {
				expand: true,
				flatten: true,
				src: [
					'src/fonts/*.*'
				],
    			dest: 'dist/fonts/'
			},
			fav: {
				expand: true,
				flatten: true,
				src: [
					'src/fav/*.*'
				],
    			dest: 'dist/fav/'
			},
			images: {
				expand: true,
				flatten: true,
				src: [
					'src/images/*.*'
				],
    			dest: 'dist/images/'
			},									
			xml: {
				expand: true,
				flatten: true,
				src: [
					'src/browserconfig.xml'
				],
    			dest: 'dist/'
			}		
		},

		// https://github.com/dciccale/grunt-processhtml
		// https://www.npmjs.com/package/grunt-processhtml
		processhtml: {
		  dist: {
		    options: {
		      process: true,
		      data: {
		        title: 'My app',
		        message: 'This is production distribution'
		      }
		    },
		    files: {
		      'dist/index.html': ['dist/index.html']
		    }
		  }
		},

		// https://github.com/gruntjs/grunt-contrib-htmlmin
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: '',
					src: 'dist/index.html',
					dest: 'dist/'
				}]
			}
		},

		// Compile Less
		less: {
			dist: {
				options: {
					// strictImports: true,
					sourceMap: true,
					outputSourceFiles: true
				},
				files: {
					'src/css/piatto.css': 'src/css/piatto.less'
				}
			}
		},

		// Minify CSS
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			target: {
				files: {
					'dist/css/piatto.min.css': ['dist/css/piatto.css', 'dist/css/app.css', 'dist/css/animate.css']
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-imagemin
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					expand: true,
					cwd: 'src/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'dist/images'
				}]
			}
		},

		// Combine JS vs Css files
		// https://github.com/gruntjs/grunt-contrib-concat
		concat: {
			js: {
				src: [
					'dist/js/app.js', 'dist/js/jquery.leanModal.js'
				],
				dest: 'dist/js/app.min.js',
				nonull: true
			}
		},

		// Minify JS
		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'dist/js/app.min.js': ['dist/js/app.min.js']
				}
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'dist/css/piatto.css',
					'dist/js/app.js',
					'dist/js/jquery.leanModal.js',
					'dist/index.html'
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./dist"
				}
			},
		},

		// https://github.com/gruntjs/grunt-contrib-jade
		jade: {
		  pretty: {
		    options: {
		      data: {
		        debug: false
		      }
		    },
		    files: {
		      "src/index.html": ["src/index.jade"]
		    },
		    options: {
      			pretty: true
    		}
		    
		  },
		  min: {
		    options: {
		      data: {
		        debug: false
		      }
		    },
		    files: {
		      "src/index.html": ["src/index.jade"]
		    },
		    options: {
      			pretty: false
    		}
		    
		  },		  
		},

		'gh-pages': {
		  options: {
		    base: 'dist'
		  },
		  src: ['**']
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
		
		html: {
		        files: 'src/index.jade',
            		tasks: ['jade:pretty', 'processhtml:dist', 'copy:html']
			},
		less: {
			files: 'src/css/*.less',
            		tasks: ['less', 'copy:css']
			},
		js: {
			files: ['src/js/*.js'],
			tasks: ['copy:js']
			}
        },
		
		//https://github.com/gruntjs/grunt-contrib-clean		
		clean: {
  		// Deletes targets with per target options
  		js: ["dist/js/jquery.leanModal.js", "dist/js/app.js"],
  		css: ["dist/css/*.*", "!dist/css/*.min.css"]
		}               
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-notify'); // https://github.com/dylang/grunt-notify
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jade'); // https://github.com/gruntjs/grunt-contrib-jade
//	grunt.loadNpmTasks('grunt-gh-pages'); 


	// Task to run when doing 'grunt' in terminal.
	grunt.registerTask('default', [
		'jade:pretty', 			// Compiles jade to html
		'less', 				// Compiles all Less files in src/less		
		'copy:html', 			// Copies html from src to dist
		'copy:css', 			// Copies css from src to dist
		'copy:js', 			// Copies js from src to dist
		'browserSync',
		'watch'					// Watches for changes in src/*.html, src/less/** and src/js/**
	]);

	grunt.registerTask('prod', [
		'jade:pretty', 			// 
		'less', 				// Compiles all Less files in src/less		
		'copy', 				// Copies src/index.html to index.html		
		'processhtml:dist',		// :dist, :dev Replaces the css and js paths in index.html with the minimized versions
//		'concat:js', 			// Combines all js files to dist/app.js		
		'uglify:dist',			// Minifies dist/js/app.min.js
		'cssmin', 				// Minifies the css files			
		'imagemin:dist',		// Optimizes all images in images/
		'clean'	   				// Removes build folders and files
//		'gh-pages'		
		]);
};
