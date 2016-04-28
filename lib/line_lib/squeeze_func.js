'use strict'
module.exports = (function () {

var Line = require("./line_obj.js");

/*
*squeeze continuous chars
*/
Line.prototype.squeeze = function (chr) {
	if (chr === undefined) {
		chr = ' ';
	}
	
	try {
		if (chr.length != 1) {
			throw new Error("Please input ONE char! If you need to squeeze a set of chars, use Line.squeeze_set([arr])");
		}
	} catch (exception) {
		throw new Error("Input not a string!\n" + "System Error Report: " + exception);
	}
	
	
	var arr = "";
	var has_chr_before = false;
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((str != chr) || (has_chr_before == false)) {
			if (str == chr) {
				has_chr_before = true;
			} else {
				has_chr_before = false;
			}
			arr += (this.line[i]);
		}
	}
	return arr;
}

/*
*squeeze a set of continuous chars
*/
Line.prototype.squeeze_set = function (chrs) {
	if (chrs === undefined) {
		chrs = [' '];
	}
	
	var arr = this.line;
	
	try {
		if (chrs.length == 0) {
			throw new Error("You cannot input an empty set!");
		}
		for (var i = 0; i < chrs.length; i++) {
			if (chrs[i].length != 1) {
				throw new Error("Please input ONE char for each set element!");
			}
		}
	} catch (exception) {
		throw new Error("Input not a string!\n" + "System Error Report: " + exception);
	}
	
	for (var i = 0; i < chrs.length; i++) {
		var temp = new Line(arr);
		arr = temp.squeeze(chrs[i]);
	}
	return arr;
}

}());