'use strict'
var Line = require('../lib/line_lib/line_obj.js')


//Assemble different pre-written packages
require("../lib/line_lib/empty_func.js");
require("../lib/line_lib/blank_func.js");
require("../lib/line_lib/length_func.js");
require("../lib/line_lib/ascii_func.js");
require("../lib/line_lib/split_func.js");
require("../lib/line_lib/squeeze_func.js");
require("../lib/line_lib/chop_func.js");

module.exports = Line;


