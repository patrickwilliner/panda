(function() {
	'use strict';
	
	var module = angular.module('pdBundleDirective', []);

	module.directive('pdBundle', [function () {
		return {
			restrict: 'E',
			templateUrl: 'views/link/bundle.html'
		};
	}]);
})();