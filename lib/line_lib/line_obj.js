'use strict'
/*declare line object*/
var Line = function (str) {
	try {
		str.length;
	} catch (exception) {
		throw new Error("A string cannot by undefined!\n" + "System Error Report: " + exception);
	}
	
	if (str.toString() !== str) {
		throw new Error("A string is needed!\n" + "System Error Report: " + exception);
	}
	
	this.line = str;
	this.is_spc_tab_empty = true;
};

Line.prototype.constructor = Line;


/*
*pass a function call (MUST return a String) and create and return a new Line object based on the output
*/
Line.prototype.pass = function (func_name, args) {
	
	var func = eval("Line.prototype." + func_name);
	
	try {
		var result = func.apply(this, args);
		var result_Line = new Line(result);
		result_Line.is_spc_tab_empty = this.is_spc_tab_empty;
	} catch (exception) {
		throw new Error("Cannot pass line to a new Line object. Perhaps the function does not generate a string?")
	}
	return result_Line;
}

module.exports = Line;