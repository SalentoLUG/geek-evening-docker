/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8888;
	var base = grunt.option('base') || '.';

	// Project configuration
	grunt.initConfig({
		connect: {
			server: {
				options: {
					port: port,
					base: base,
					livereload: true,
					open: true
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			html: {
        files: [ "./src/**/*.html" ]
			},
			markdown: {
        files: [ "./src/**/*.md" ]
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );

	// Serve presentation locally
	grunt.registerTask( 'serve', [ 'connect', 'watch' ] );

};
