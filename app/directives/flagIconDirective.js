define([], function() {
	function pdFlagIconDirective() {
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
	}

	return pdFlagIconDirective;
});