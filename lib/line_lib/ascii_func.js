'use strict'
module.exports = (function () {

var Line = require("./line_obj.js");

/////////////////ASCII Block////////////////////

/*
*return whether the Line is ASCII only
*(set extended by explicitly state "true" in function brackets)
*/
Line.prototype.is_ASCII = function(extended) {
	if (extended === undefined) {
		extended = false;
	}
	return (extended ? (/^[\x00-\xFF]*$/) : (/^[\x00-\x7F]*$/)).test(this.line);
}

/*
*return all non-ASCII chars in the form of an array
*(set extended by explicitly state "true" in function brackets)
*/
Line.prototype.get_non_ASCII = function (extended) {
	if (extended === undefined) {
		extended = false;
	}
	var arr = [];
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((function() {
			return ! (extended ? (/^[\x00-\xFF]$/) : (/^[\x00-\x7F]$/)).test(str);
			}())) {
			arr.push(this.line[i]);
		}
	}
	return arr;
}

/*
*return a string with all non-ASCII chars removed
*(set extended by explicitly state "true" in function brackets)
*/
Line.prototype.chop_non_ASCII = function (extended) {
	if (extended === undefined) {
		extended = false;
	}
	var result = "";
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((function() {
			return (extended ? (/^[\x00-\xFF]*$/) : (/^[\x00-\x7F]*$/)).test(str);
			}())) {
			result += (this.line[i]);
		}
	}
	return result;
}

}());
