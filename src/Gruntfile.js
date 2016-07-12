"use strict";

module.exports = function (grunt) {
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		copy: {
			build: {
				files: [
					{
						expand: true,
						src: [
							"fonts/**", "img/**"
						],
						dest: "../"
					}
				]
			},
			html: {
				files: [
					{
						expand: true,
						src: ["*.html"],
						dest: "../"
					}
				]
			},
			scripts: {
				files: [
					{
						expand: true,
						src: ["js/**"],
						dest: "../"
					}
				]
			}
		},

		csso: {
			style: {
				options: {
					report: "gzip"
				},
				files: {
					"../css/style.min.css": ["../css/style.css"]
				}
			}
		},

		imagemin: {
			images: {
				options: {
					optimizationLevel: 3
				},
				files: [
					{
						expand: true,
						src: ["../img/**"]
					}
				]
			}
		},

		less: {
			style: {
				files: {
					"../css/style.css": ["less/style.less"]
				}
			}
		},

		postcss: {
			options: {
				processors: [
					require("autoprefixer")({
						browsers: ["last 1 version", "last 2 Chrome versions", "last 2 Firefox versions", "last 2 Opera versions", "last 2 Edge versions"]
					}),
					require("css-mqpacker")({sort: true})
				]
			},
			style: {
				src: "../css/*.css"
			}
		},

		browserSync: {
			server: {
				bsFiles: {
					src: ["../*.html", "../css/*.css", "../js/*.js"]
				},
				options: {
					server: "../",
					watchTask: true,
					notify: false,
					open: true,
					ui: false
				}
			}
		},

		watch: {
			html: {
				files: ["*.html"],
				tasks: ["copy:html"],
				options: {
					spawn: false
				}
			},
			scripts: {
				files: ["js/*.js"],
				tasks: ["copy:scripts"],
				options: {
					spawn: false
				}
			},
			style: {
				files: ["less/**/*.less"],
				tasks: [
					"less", "postcss", "csso"
				],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.registerTask("serve", ["browserSync", "watch"]);
	grunt.registerTask("build", ["copy", "less", "postcss", "csso", "imagemin"]);
};
