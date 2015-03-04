(function() {
	'use strict';

	var module = angular.module('pdUserService', []);

	module.factory('UserService', [function (userService) {
		return {
			login: 'wipa',
			firstName: 'Patrick',
			lastName: 'Williner'
		};
	}]);
})();