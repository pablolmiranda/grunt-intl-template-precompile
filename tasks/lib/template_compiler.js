(function () {
   'use strict';
   // this function is strict...
}());

exports.init = function(grunt) {

    exports.compile = function(template, strings) {
        var compiled_template = template;
        for ( var key in strings) {
            var pattern = "{{\\s*" + key + "\\s*}}",
                regex = new RegExp(pattern, 'g');
            
            compiled_template = compiled_template.replace(regex, strings[key]);
        }
        return compiled_template;
    };

    return exports;
};
