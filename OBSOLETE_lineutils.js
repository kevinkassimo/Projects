'use strict'
var Line = function (str) {
	this.line = str;
	this.is_spc_tab_empty = true;
};

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

/*
*chop off all the blanks
*/
Line.prototype.chop_blank = function () {
	var arr = "";
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((function() {
			return (str != '\t' && str != ' ');
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
	var arr = "";
	var has_blank_before = false;
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((function() {
			return (str != '\t' && str != ' ');
			}()) || (has_blank_before == false)) {
			has_blank_before = true;
			arr += (this.line[i]);
		} else {
			has_blank_before = false;
		}
	}
	return arr;
}

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

Line.prototype.get_non_ASCII = function (extended) {
	if (extended === undefined) {
		extended = false;
	}
	var arr = [];
	for (var i = 0; i < this.line.length; i++) {
		var str = this.line[i];
		if ((function() {
			return ! (extended ? (/^[\x00-\xFF]*$/) : (/^[\x00-\x7F]*$/)).test(str);
			}())) {
			arr.push(this.line[i]);
		}
	}
	return arr;
}

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


Line.prototype.split_by_char_once = function (chr) {
	if (chr === undefined) {
		chr = ' ';
	}
	var arr = [];
	var mark = 0;
	for (var i = 0; i < this.line.length; i++) {
		if (this.line[i] == chr) {
			if (mark >= i) {
				continue;
			}
			arr.push(this.line.substr(mark, i-mark));
			break;
		}
	}
	
	if (mark < this.line.length) {
		arr.push(this.line.substr(mark, this.line.length-mark));
	}
	
	return arr;
}



Line.prototype.split_by_char = function (chr) {
	if (chr === undefined) {
		chr = ' ';
	}
	var arr = [];
	var mark = 0;
	for (var i = 0; i < this.line.length; i++) {
		if (this.line[i] == chr) {
			if (mark >= i) {
				continue;
			}
			arr.push(this.line.substr(mark, i-mark));
			mark = (i+1);
		}
	}
	
	if (mark < this.line.length) {
		arr.push(this.line.substr(mark, this.line.length-mark));
	}
	
	return arr;
}



Line.prototype.constructor = Line;


var test = new Line("t  开 h  ");
console.log(test.get_length());
console.log(test.get_length_strict());
console.log(test.is_ASCII(true));
console.log(test.get_non_ASCII(true));
console.log(test.chop_non_ASCII(true));
console.log(test.chop_blank());
console.log(test.squeeze_blank());
console.log(test.split_by_char_once());
console.log(test.split_by_char());