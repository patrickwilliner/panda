(function() {
	'use strict';

	var module = angular.module('pdTagService', ['ngResource']);

	module.factory('Tag', ['$resource', function ($resource) {
		return $resource('/api/tags/:id');
	}]);
})();