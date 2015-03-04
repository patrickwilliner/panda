(function() {
	'use strict';
	
	var module = angular.module('pdDomainFilter', []);

	module.filter('domain', function() {
	  return function(input) {
	    var result = '';
	    input = input || '';
	    
	    var parser = document.createElement('a');
			parser.href = input;
			result = parser.hostname;

	    return result;
	  };
	});
})();