(function() {
	'use strict';
	
	var module = angular.module('pdDialogDirective', []);

	module.directive('pdDialog', [function () {
		return {
			restrict: 'E',
			templateUrl: 'views/common/dialog.html',
			scope: {
				bodyUrl: '=bodyUrl',
				footerUrl: '=footerUrl',
				dialog: '=dialog'
			}
		};
	}]);
})();