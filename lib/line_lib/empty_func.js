'use strict'
module.exports = (function () {

var Line = require("./line_obj.js");

/////////////////Empty Block////////////////////

/*
*return true if the Line is strictly empty
*(space and tabs are defined as chars)
*/
Line.prototype.is_empty_strict = function () {
	return (this.line.length == 0);
}


/*
*set if space and tabs are defined as chars in
*function is_empty()
*/
Line.prototype.is_spc_tab_empty = true;

/*
*return true if the Line is empty 
*(default: space and tabs are NOT defined as chars)
*(to change this setting, turn is_spc_tab_empty to false)
*/
Line.prototype.is_empty = function () {
	if (this.is_empty_strict()) {
		return true;
	} else {
		var iste = this.is_spc_tab_empty;
		for (var i = 0; i < this.line.length; i++) {
			if (this.line[i] == '\n' || (function (iste) {
				if (iste) {
					return (this.line[i] == ' ' || this.line[i] == '\t');
				} else {
					return false;
				}
			})) {
				return true;
			}
		}
		return false;
	}
}

}());
