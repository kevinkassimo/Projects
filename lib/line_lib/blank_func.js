'use strict'
module.exports = (function () {

var Line = require("./line_obj.js");
require("./squeeze_func.js")

//////////////BLANK BLOCK/////////////////

/*
*chop off all the blanks
*/
Line.prototype.chop_blank = function () {
	var arr = "";
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((function() {
			return !(/^[\t\ ]$/).test(str);
			//return (str != '\t' && str != ' ');
			}())) {
			arr += (this.line[i]);
		}
	}
	return arr;
}

/*
*squeeze continuous blanks
*/
Line.prototype.squeeze_blank = function () {
	var temp = new Line(this.line);
	return temp.squeeze_set([" ", "\t"]);
}

}());