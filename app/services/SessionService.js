(function() {
	'use strict';

	var module = angular.module('pdSessionService', []);

	module.factory('SessionService', [function () {
		return {
			login: 'wipa',
			firstName: 'Patrick',
			lastName: 'Williner'
		};
	}]);
})();