module.exports = function(grunt) {

    grunt.initConfig({

        clean: {
            tests: ['tmp']
        },

        nodeunit: {
            all: ['test/test.js']
        },

        "intl-precompile-templates": {
            dist: {
                files: [{
                    src: ['test/fixtures/*.pres'],
                    templates: ['test/fixtures/*.mu'],
                    dest: 'tmp/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-clean');
    
    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['nodeunit']);

    grunt.registerTask('default', ['clean', 'intl-precompile-templates:dist', 'test']);
}