define([], function() {
	'use strict';
	
	function tagService($resource) {
		return $resource('/api/tags/:id');
	}

	tagService.$inject = ['$resource'];
	return tagService;
});