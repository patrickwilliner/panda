define([], function() {
	'use strict';
	
	function pdLinkDialogDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/link/linkDialog.html',
			scope: {
				dialog: '=dialog',
				form: '=form'
			}
		};
	}

	return pdLinkDialogDirective;
});