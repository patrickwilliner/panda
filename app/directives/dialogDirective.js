/**
 * Directive that renders a dialog (i.e. bootstrap modal).
 */
define([], function() {
	'use strict';
	
	function pdDialogDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/shared/dialog.html',
			scope: {
				dialog: '=dialog',
				form: '=form'
			}
		};
	}

	return pdDialogDirective;
});