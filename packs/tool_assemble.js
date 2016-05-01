'use strict'
var util = require("util")
var string_func = require("../lib/line_lib/ll_config.js");


//Test inheritance Block, should be removed at any time
var temp = function () {
	this.happy = "happy";
}

//var exp = Object.assign(string_func);
var exp = function () {
	string_func.call(this);
	temp.call(this);
};
//util.inherits(exp, string_func);

util.inherits(exp, string_func);

//Test inherit block, should be removed at any time in the future.
util.inherits(exp, temp);


module.exports = new exp();

