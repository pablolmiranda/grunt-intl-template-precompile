(function () {
   'use strict';
   // this function is strict...
}());

var grunt = require('grunt'),
    _ = require('lodash'),
    compiler = require('../tasks/lib/template_compiler').init(grunt),
    string_occorence = function(string, token) {
        var counter = 0;
        string.replace(new RegExp(token, 'g'), function(){
            counter++;
        });
        return counter;
    };

exports.nodeunit = {
    "should replace a single string inside the template": function(test) {
        var template = "<div>{{str_some_string_to_replace}}</div>",
            strings = {
                str_some_string_to_replace: "string replaced"
            },
            compiled_template = "";

        compiled_template = compiler.compile(template, strings);
        test.ok(_.contains(compiled_template, 'string replaced'));

        test.done();
    },

    "should replace all the references inside the template": function(test) {
        var template = "<div>{{str_some_string_to_replace}}<span>{{str_some_string_to_replace}}</span></div>",
            strings = {
                str_some_string_to_replace: "string replaced"
            },
            compiled_template = "";

        compiled_template = compiler.compile(template, strings);

        test.equal(2, string_occorence(compiled_template, "string replaced"), 'the references to the string should be different');

        test.done();
    },

    "should replace different strings inside the template": function(test) {
        var template = "<div>{{str_first_replace}}<span>{{str_second_replace}}</span></div>",
            strings = {
                str_first_replace: "string first replaced",
                str_second_replace: "string second replaced"
            },
            compiled_template = "";

        compiled_template = compiler.compile(template, strings);

        test.equal(1, string_occorence(compiled_template, strings.str_first_replace), 'should replace str_first_replace inside the template');
        test.equal(1, string_occorence(compiled_template, strings.str_second_replace), 'should replace str_second_replace inside the template');

        test.done();
    },

    "should keep the non referenced strings": function(test) {
        var template = "<div>{{str_to_be_replaced}}<span>{{str_to_not_be_replaced}}</span></div>",
            strings = {
                str_to_be_replaced: "string replaced"
            },
            compiled_template = "";

        compiled_template = compiler.compile(template, strings);

        test.equal(1, string_occorence(compiled_template, strings.str_to_be_replaced), 'should replace str_to_be_replaced inside the template');
        test.equal(1, string_occorence(compiled_template, '{{str_to_not_be_replaced}}'), 'should keep the the string {{str_to_not_be_replaced}}');

        test.done();
    },

    "should ignore the whitespace between the brackets and the string key": function(test) {
        var template = "<div>{{ str_to_be_replaced}}<span>{{str_to_be_replaced }}</span><span>{{ str_to_be_replaced }}</span></div>",
            strings = {
                str_to_be_replaced: "string replaced"
            },
            compiled_template = "";

        console.log('calling compiler');
        compiled_template = compiler.compile(template, strings);
        
        test.equal(3, string_occorence(compiled_template, strings.str_to_be_replaced, 'should replace all references, with or without whitespace'));
        test.done();
    }
};