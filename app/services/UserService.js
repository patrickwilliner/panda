define([], function() {
	'use strict';
	
	function userService($resource) {
		return $resource('/api/users/:id');
	}

	userService.$inject = ['$resource'];
	return userService;
});