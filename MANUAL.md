Object Line:
--primitive:
	String line
	Bool is_spc_tab_empty

--functions:
	--Constructor:
		Line(string)
		pass(func[, [args]])
	--Empty:
		bool is_empty_strict()
		bool is_empty()
	--Length:
		num get_length_strict()
		num get_length()
	--Blank:
		string chop_blank()
		string squeeze_blank()
	--ASCII:
		bool is_ASCII()	
		string[] get_non_ASCII()	
		string chop_non_ASCII()
	--Split:
		string[] split_by_char_once(chr) [OBSOLETE]
		string[] split_by_char_times(chr, times)
		string[] split_by_char_discrete(chr)
		string[] split_by_char_continuous(chr)
		string[] split_by_pattern_once(str) [OBSOLETE]
		string[] split_by_pattern_times(str, times)
		string[] split_by_pattern(str)
		string[] split_by(str)
		string[] split_at_type(type[, is_continuous])
		string[] split_at_pattern(str)
		string[] split_at(str)
	--Chop:
		string chop(args)
		string chop_regex(args)