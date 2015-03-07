(function() {
	'use strict';
	
	var module = angular.module('pdLinkDialogDirective', []);

	module.directive('pdLinkDialog', [function () {
		return {
			restrict: 'E',
			templateUrl: 'views/link/linkDialog.html',
			scope: {
				dialog: '=dialog',
				form: '=form'
			}
		};
	}]);
})();