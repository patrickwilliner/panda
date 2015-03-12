define([], function() {
	'use strict';

	function pdBundleDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/link/bundle.html'
		};
	}

	return pdBundleDirective;
});