(function() {
	'use strict';

	var module = angular.module('pdBundleService', ['ngResource']);

	module.factory('Bundle', ['$resource', function ($resource) {
		return $resource('/api/bundles/:id');
	}]);
})();