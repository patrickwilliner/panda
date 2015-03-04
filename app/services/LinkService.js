(function() {
	'use strict';

	var module = angular.module('pdLinkService', ['ngResource']);

	module.factory('Link', ['$resource', function ($resource) {
		return $resource('/api/links/:id');
	}]);
})();