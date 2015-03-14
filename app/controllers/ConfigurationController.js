define(['jquery'], function($) {
	'use strict';
	
	function configurationController($scope) {
		$scope.setTab = function(identifier) {
			$scope.selection.tabItem = identifier;
		};

		$scope.selection = {
			tabItem: 'bundles'
		};
	}

	configurationController.$inject = ['$scope'];
	return configurationController;
});