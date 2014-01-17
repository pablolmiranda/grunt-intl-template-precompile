module.exports = function(grunt) {

    var compiler = require('./lib/template_compiler.js').init(grunt),
        path = require('path'),
        iniparser = require('iniparser'),
        path = require('path'),
        intl_file_regex = /lang_(.*).pres/;

    grunt.registerMultiTask('intl-precompile-templates', 'Based on a intl file generate a precompile template file', function(){

        var options = this.options(),
            intl_filename_pattern = options.intl_filename_patterns || void(0),
            
            extract_intl_name = function(intl_file) {
                var basename = path.basename(intl_file),
                    matches = basename.match(intl_file_regex);

                    return matches[1];
            },

            create_intl_folder = function(dest, intl){
                var intl_folder = dest + "/" + intl;

                if( !grunt.file.isDir(dest) ) {
                    grunt.file.mkdir(dest);
                }
                if( !grunt.file.isDir(intl_folder) ) {
                    grunt.file.mkdir(intl_folder);
                }

                return intl_folder.replace(/\/\//, '/');
            },

            compile_templates = function(_templates, strObj) {
                var compiled_templates = {},
                    templates = grunt.file.expand(_templates),
                    base_folder = path.dirname(_templates).replace(/\*\*/, '');

                templates.forEach(function(template){
                    var template_name = template.replace(new RegExp(base_folder), ''),
                        template_content = grunt.file.read(template),
                        compiled_template = compiler.compile(template_content, strObj);
                    compiled_templates[template_name] = compiled_template;
                });

                return compiled_templates;
            },
            create_intl_templates = function(templates, intl_folder) {
                for ( var template in templates ) {
                    var template_filepath = intl_folder + '/' + template,
                        template_content = templates[template];
                    grunt.file.write(template_filepath, template_content);
                }
            };

        this.files.forEach(function(f){
            f.src.forEach(function(intl_file){
                var content = grunt.file.read(intl_file),
                    intl = extract_intl_name(intl_file),
                    strObj = iniparser.parseString(content),
                    compiled_templates = '',
                    intl_folder = '';

                intl_folder = create_intl_folder(f.dest, intl);
                compiled_templates = compile_templates(f.templates, strObj);
                create_intl_templates(compiled_templates, intl_folder);

            });
        });
    });
};