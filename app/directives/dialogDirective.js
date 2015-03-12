define([], function() {
	'use strict';
	
	function pdDialogDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/common/dialog.html',
			scope: {
				dialog: '=dialog',
				form: '=form'
			}
		};
	}

	return pdDialogDirective;
});