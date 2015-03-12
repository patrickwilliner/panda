define([], function() {
	'use strict';

	function linkService($resource) {
		return $resource('/api/links/:id');
	}

	linkService.$inject = ['$resource'];
	return linkService;
});