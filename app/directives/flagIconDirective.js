/**
 * Directive which will render an icon for the given boolean value.
 */
define([], function() {
	function pdFlagIconDirective() {
		return {
			restrict: 'E',
			scope: {
	      value: '=value'
	    },
			templateUrl: 'views/shared/flagIcon.html',
			controller: function($scope) {
				$scope.getFlagIconClass = function() {
					return 'glyphicon ' + ($scope.value ? 'glyphicon-ok' : 'glyphicon-remove');
				};
			}
		};
	}

	return pdFlagIconDirective;
});