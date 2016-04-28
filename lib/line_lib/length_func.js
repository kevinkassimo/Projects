'use strict'
module.exports = (function () {

var Line = require("./line_obj.js");

/////////////////Length Block////////////////////

/*
*return the length of the Line strictly
*(space and tabs are defined as chars)
*/
Line.prototype.get_length_strict = function () {
	return this.line.length;
}

/*
*return the length of the Line
*(default: space and tabs are NOT defined as chars)
*(to change this setting, turn is_spc_tab_empty to false)
*/
Line.prototype.get_length = function () {
	if (this.is_spc_tab_empty) {
		var len = 0;
		for (var i = 0; i < this.line.length; i++) {
			if (this.line[i] != '\t' && this.line[i] != ' ') {
				len++;
			}
		}
		return len;
	}
	return this.get_length_strict();
}

}());