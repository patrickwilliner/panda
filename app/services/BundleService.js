define([], function() {
	'use strict';

	function bundleService($resource) {
		return $resource('/api/bundles/:id');
	}

	bundleService.$inject = ['$resource'];
	return bundleService;
});