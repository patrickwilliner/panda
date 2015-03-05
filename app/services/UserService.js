(function() {
	'use strict';

	var module = angular.module('pdUserService', ['ngResource']);

	module.factory('User', ['$resource', function ($resource) {
		return $resource('/api/users/:id');
	}]);
})();