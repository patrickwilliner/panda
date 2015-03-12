define([], function() {
	'use strict';
	
	function domainFilter() {
		return function(input) {
	    var result = '';
	    input = input || '';
	    
	    var parser = document.createElement('a');
			parser.href = input;
			result = parser.hostname;

	    return result;
	  };
	}

	return domainFilter;
});