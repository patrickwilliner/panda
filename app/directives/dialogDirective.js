(function() {
	'use strict';
	
	var module = angular.module('pdDialogDirective', []);

	module.directive('pdDialog', [function () {
		return {
			restrict: 'E',
			templateUrl: 'views/common/_dialog.html',
			scope: {
				dialog: '=dialog',
				form: '=form'
			}
		};
	}]);
})();