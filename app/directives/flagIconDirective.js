(function() {
	'use strict';
	
	var module = angular.module('pdFlagIconDirective', []);

	module.directive('pdFlagIcon', [function () {
		return {
			restrict: 'E',
			scope: {
	      value: '=value'
	    },
			templateUrl: 'views/common/flagIcon.html',
			controller: function($scope) {
				$scope.getFlagIconClass = function() {
					return 'glyphicon ' + ($scope.value ? 'glyphicon-ok' : 'glyphicon-remove');
				};
			}
		};
	}]);
})();