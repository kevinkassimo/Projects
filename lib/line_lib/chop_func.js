'use strict'
module.exports = (function () {

}())

var Line = require("./line_obj.js");


/*
*chop a list of patterns from the line; 
*Arguments should be given at least 1; 
*Arguments will be read from left to right (meaning if there are collisions, e.g "aaa", "aaab", the former will be managed first)
*/
Line.prototype.chop = function () {
	if (arguments.length <= 0) {
		throw new Error("Argument error.");
	}
	
	var args = Array.from(arguments);
	
	try {
		args.forEach(function (arg) {
			arg = String(arg);
		});
		
	} catch (exception) {
		throw new Error("Cannot initialize arguments list.")
	}
	
	var str = this.line;
	
	args.forEach(function (pattern) {
		while (str.indexOf(pattern) >= 0) {
			str = str.replace(pattern, "");
		}
	});

	return str;
}


/*
*chop regex patterns from line; 
*Arguments should be given more than 1; 
*Arguments will be read from left to right (meaning if there are collisions, e.g "/[a]/", "/^[a]/", the former will be managed first)
*/
Line.prototype.chop_regex = function (regex) {
	if (arguments.length <= 0) {
		throw new Error("Argument error.");
	}
	
	var args = Array.from(arguments);
	
	/*
	try {
		for (var i = 0; i < args.length; i++) {
			args[i] = String(args[i]);
			if (args[i][0] != "/" || args[i][args[i].length-1] != "/") {
				throw new Error("Not a regex expression");
			}
			args[i] = args[i].substring(1, args[i].length-1);
			//args[i] = arg[i] + '/g';
			console.log(args[i]);
		}
	} catch (exception) {
		throw new Error("Cannot initialize arguments list.");
	}*/
	
	var str = this.line;
	
	args.forEach(function (pattern) {
		str = str.replace(RegExp(pattern), "");
		console.log(str);
	});

	return str;
}