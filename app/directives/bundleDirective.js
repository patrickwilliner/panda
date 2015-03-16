/**
 * Directive that renders a bundle.
 */
define([], function() {
	'use strict';

	function pdBundleDirective() {
		return {
			restrict: 'E',
			templateUrl: 'views/link/bundle.html',
            controller: 'linkDetailController',
            scope: true
		};
	}

	return pdBundleDirective;
});