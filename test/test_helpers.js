var path = require('path');

exports.init = function (grunt) {

    exports.get_intls = function(folder) {
        var intl_files = grunt.file.expand(folder + '/*.pres'),
            intls = [];

        intl_files.forEach(function(intl_file){
            intls.push(path.basename(intl_file).match(/lang_(.*).pres/)[1]);
        });

        return intls;
            
    };

    exports.get_templates = function(folder, extension) {
        var templates = grunt.file.expand(folder + '/' + extension),
            relative_path_templates = [];
        templates.forEach(function(template){
            relative_path_templates.push(template.replace(new RegExp(folder), ''));
        });

        // console.log(relative_path_templates);

        return relative_path_templates;
    };

    exports.string_occorence = function(string, token) {
        var counter = 0;
        string.replace(new RegExp(token, 'g'), function(){
            counter++;
        });
        return counter;
    };

    return exports;

};