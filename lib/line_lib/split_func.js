'use strict'
module.exports = (function () {

var Line = require("./line_obj.js");
require("./squeeze_func.js")

/////////////////Split Block////////////////////

/*
*[[OBSOLETE]]
*return a two-element array as we chop the string into halves based on the first appearance of an char
*/
Line.prototype.split_by_char_once = function (chr) {
	if (chr === undefined) {
		chr = ' ';
	}
	if (chr.length != 1) {
		throw new Error("Only accept single char. Please recheck the arguments");
	}
	
	var arr = [];
	var mark = 0;
	for (var i = 0; i < this.line.length; i++) {
		if (this.line[i] == chr) {
			if (mark > i) {
				continue;
			}
			arr.push(this.line.substr(mark, i-mark));
			break;
		}
	}
	
	if (mark < this.line.length) {
		arr.push(this.line.substr(mark, this.line.length-mark));
	}
	
	while (arr.indexOf("") > -1) {
		arr.splice(arr.indexOf(""), 1);
	} //remove extra "" entry
	
	return arr;
}

/*
*return an array as we chop the string at places of a char by given times
*/
Line.prototype.split_by_char_times = function (chr, times) {
	if (arguments.length !== 1 && arguments.length !== 2) {
		throw new Error("Need 1 or 2 arguments. Format split_by_char_times ([chr,] times).");
	}
	if (arguments.length === 1) {
		chr = ' ';
		times = arguments[0];
	}
	try {
		chr = chr.toString();
		times = Number(times);
	} catch (exception) {
		throw new Error("Parameters are not valid.");
	}
	if (times < 0) {
		throw new Error("times should be a nonnegative number.");
	}
	if (chr.length != 1) {
		throw new Error("Only accept single char. Please recheck the arguments");
	}
	
	var curr_times = 0;
	
	var arr = [];
	var mark = 0;
	for (var i = 0; i < this.line.length; i++) {
		if (this.line[i] == chr) {
			if (curr_times >= times) {
				break;
			}
			if (mark > i) {
				continue;
			}
			arr.push(this.line.substr(mark, i-mark));
			mark = (i+1);
			
			curr_times++;
		}
	}
	
	if (mark < this.line.length) {
		arr.push(this.line.substr(mark, this.line.length-mark));
	}
	
	while (arr.indexOf("") > -1) {
		arr.splice(arr.indexOf(""), 1);
	} //remove extra "" entry
	
	return arr;
}

/*
*return an array of strings split by one single char discretely
*difference from split_by_char_continuous:
*e.g. var a = new Line("java   script");
*a.split_by_char_discrete() => ["java", "  script"]
*a.split_by_char_continuous() => ["java", "script"]
*/
Line.prototype.split_by_char_discrete = function (chr) {
	if (chr === undefined) {
		chr = ' ';
	}
	if (chr.length != 1) {
		throw new Error("Only accept single char. Please recheck the arguments");
	}
	
	var arr = [];
	
	var has_chr_before = false;
	var mark = 0;
	for (var i = 0; i < this.line.length; i++) {
		if (this.line[i] == chr) {
			if (mark > i) {
				continue;
			}
			if (has_chr_before == false) {
				arr.push(this.line.substr(mark, i-mark));
				mark = (i+1);
				has_chr_before = true;
			}
		} else {
			has_chr_before = false;
		}
	}
	
	if (mark < this.line.length) {
		arr.push(this.line.substr(mark, this.line.length-mark));
	}
	
	while (arr.indexOf("") > -1) {
		arr.splice(arr.indexOf(""), 1);
	} //remove extra "" entry
	
	return arr;
}

/*
*return an array of strings split by one specific char while specially caring for continuous appearance.
*difference from split_by_char_discrete:
*e.g. var a = new Line("java   script");
*a.split_by_char_discrete() => ["java", "  script"]
*a.split_by_char_continuous() => ["java", "script"]
*/
Line.prototype.split_by_char_continuous = function (chr) {
	if (chr === undefined) {
		chr = ' ';
	}
	if (chr.length != 1) {
		throw new Error("Only accept single char. Please recheck the arguments");
	}
	
	var temp1 = new Line(this.line);
	var temp_line = temp1.squeeze(chr);
	var temp2 = new Line(temp_line);
	var arr = temp2.split_by_char_discrete(chr);
	
	return arr;
}

/*
*[[OBSOLETE]]
*return an array of strings split by one substring pattern only once
*/
Line.prototype.split_by_pattern_once = function (str) {
	if (str === undefined) {
		throw new Error("Cannot use undefined string as pattern!");
	}
	
	var arr = [];
	
	var temp_str = this.line;
	var subindex = -1;
	
	subindex = temp_str.indexOf(str);
	if (subindex > -1) {
		arr.push(temp_str.substring(0, subindex));
		temp_str = temp_str.substring(subindex, temp_str.length);
		temp_str = temp_str.replace(str, "");
	}
	arr.push(temp_str);
	
	return arr;
}

/*
*return an array of strings split by one substring pattern under given times
*/
Line.prototype.split_by_pattern_times = function (str, times) {
	if (arguments.length !== 2) {
		throw new Error("Need 2 arguments. Format split_by_char_times (str, times).");
	}
	try {
		str = str.toString();
		times = Number(times);
	} catch (exception) {
		throw new Error("Parameters are not valid.");
	}
	if (times < 0) {
		throw new Error("times should be a nonnegative number.");
	}
	
	var arr = [];
	
	var curr_times = 0;
	var temp_str = this.line;
	var subindex = -1;
	
	do {
		subindex = temp_str.indexOf(str);
		if (subindex > -1) {
			arr.push(temp_str.substring(0, subindex));
			temp_str = temp_str.substring(subindex, temp_str.length);
			temp_str = temp_str.replace(str, "");
			curr_times++;
		}
		if (curr_times >= times) {
			break;
		}
	} while (subindex > -1);
	arr.push(temp_str);
	
	return arr;
}

/*
*return an array of strings split by one substring pattern
*/
Line.prototype.split_by_pattern = function (str) {
	if (str === undefined) {
		throw new Error("Cannot use undefined string as pattern!");
	}
	
	var arr = [];
	
	var temp_str = this.line;
	var subindex = -1;
	
	do {
		subindex = temp_str.indexOf(str);
		if (subindex > -1) {
			arr.push(temp_str.substring(0, subindex));
			temp_str = temp_str.substring(subindex, temp_str.length);
			temp_str = temp_str.replace(str, "");
		}
	} while (subindex > -1);
	arr.push(temp_str);
	
	while (arr.indexOf("") > -1) {
		arr.splice(arr.indexOf(""), 1);
	} //remove extra "" entry
	
	return arr;
}

/*
*short-hand for split_by_pattern
*/
Line.prototype.split_by = Line.prototype.split_by_pattern;


/*
Line.prototype.split_by = function (str) {
	var temp_Line = new Line(this.line);
	return temp_Line.split_by_pattern(str);
}*/

///////////////////FURTHER UTILS///////////////////

/*
*split when encounter a type pattern without removing the pattern
*Preset Patterns: 
*"number"
*"alphabet"
*"symbol" (chars excluding English alphabets and numbers)
*"upper"
*"lower"
*/
Line.prototype.split_at_type = function (type, is_continuous) {
	if (arguments.length !== 1 && arguments.length !== 2) {
		throw new Error("Need 1 or 2 arguments. Format split_at_type (type[, is_continuous]).");
	}
	if (arguments.length === 1) {
		type = arguments[0];
		is_continuous = true;
	}
	try {
		type = type.toString();
		is_continuous = Boolean(is_continuous);
	} catch (exception) {
		throw new Error("Parameters are not valid.");
	}
	
	var eval_func = [
		function (chr) {
			return (/^[0-9]$/).test(chr);
		},
		function (chr) {
			return (/^[A-Za-z]$/).test(chr);
		}, 
		function (chr) {
			return (/^[!-\/:-@\[-`{-\~]$/).test(chr);
		},
		function (chr) {
			return (/^[A-Z]$/).test(chr);
		},
		function (chr) {
			return (/^[a-z]$/).test(chr);
		},
		function (chr) {
			throw new Error("Not a valid examinable type.");
			return false;
		}
	];
	
	var testnum = 5;
	
	switch (type) {
		case "number":
		case "NUMBER":
		case "Number":
		case "num":
		case "NUM":
		case "Num":
		case "N":
		case "n":
			testnum = 0;
			break;
		case "alphabet":
		case "ALPHABET":
		case "Alphabet":
		case "alpha":
		case "ALPHA":
		case "Alpha":
		case "A":
		case "a":
		case "letter":
		case "LETTER":
		case "Letter":
			testnum = 1;
			break;
		case "symbol":
		case "SYMBOL":
		case "Symbol":
		case "s":
		case "S":
			testnum = 2;
			break;
		case "upper":
		case "UPPER":
		case "Upper":
		case "u":
		case "U":
		case "capital":
		case "CAPTICAL":
		case "Capital":
			testnum = 3;
			break;
		case "lower":
		case "LOWER":
		case "Lower":
		case "l":
		case "L":
			testnum = 4;
			break;
		default:
			testnum = 5;
			break;
	}
	
	var arr = [];
	var mark = 0;
	
	var cont_cond = false;

	for (var i = 0; i < this.line.length; i++) {
		if (eval_func[testnum](this.line[i])) {
			
			if (cont_cond === false || is_continuous === false) {
				cont_cond = true;
				arr.push(this.line.substr(mark, i-mark));
				mark = i;
			}
		} else {
			cont_cond = false;
		}
	}
	
	if (mark < this.line.length) {
		arr.push(this.line.substr(mark, this.line.length-mark));
	}
	
	while (arr.indexOf("") > -1) {
		arr.splice(arr.indexOf(""), 1);
	} //remove extra "" entry
	
	return arr;
}

/*
*split when encounter a string pattern without removing the pattern
*/
Line.prototype.split_at_pattern = function (str) {
	if (str === undefined) {
		throw new Error("Cannot use undefined string as pattern!");
	}
	
	var arr = [];
	
	var temp_str = this.line;
	var subindex = -1;
	var bias = 0;
	
	do {
		subindex = (temp_str.substring(bias, temp_str.length)).indexOf(str);
		if (subindex > -1) {
			arr.push(temp_str.substring(0, subindex+bias));
			temp_str = temp_str.substring(subindex+bias, temp_str.length);
			bias = str.length;
		}
	} while ((subindex) > -1);
	arr.push(temp_str);
	
	return arr;
}

/*
*short-hand for split_at_pattern
*/
Line.prototype.split_at = Line.prototype.split_at_pattern;


/*
Line.prototype.split_at = function (str) {
	var temp_Line = new Line(this.line);
	return temp_Line.split_at_pattern(str);
}*/


}());