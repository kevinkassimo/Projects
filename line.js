'use strict'
var Tool = require("./packs/tool_assemble.js");

var Line = require("./packs/assemble.js");

var test = new Line("t  开 h   1 11  11  23 1111 234");

/*
console.log(test.get_length());
console.log(test.get_length_strict());
console.log(test.is_ASCII(true));
console.log(test.get_non_ASCII(true));
console.log(test.chop_non_ASCII(true));
console.log(test.chop_blank());
console.log(test.squeeze_blank());
console.log(test.split_by_char_once());
console.log(test.split_by_char_discrete());
console.log(test.split_by_char_continuous());
console.log(test.split_by_pattern_times("11", 2));
console.log(test.split_by_char_times(1, 4));
*/
console.log(test.split_by("11"));
console.log(test.split_at_pattern("11"));
var read = new Line(test.chop_blank());
console.log(read.line);
//console.log(read.split_at_type("number", false));

var last = new Line("aaaa   bcd ccij?!df??D!");
console.log(last.squeeze_set(["a", "c", " "]));
console.log(last.pass("squeeze_set", [["a", "c", " "]]));
console.log(last.pass("chop_blank", []));
//last.pass(lf.chop_blank, []);
console.log(last.pass(Tool.chop_blank, []));
console.log(last.pass(Tool.chop, ["a", " ", "i"]));
console.log(last.chop_regex(/[?!]/g));

//var sentence = new Line("I Am The First Person Who Went To College.");
//console.log(sentence.split_by(" "));