(function() {
	'use strict';
	
	var module = angular.module('pdConfigurationController', ['pdBundleService']);

	module.controller('ConfigurationController', ['$scope', 'Bundle', function($scope, Bundle) {
		$scope.setTab = function(identifier) {
			$scope.selection.tabItem = identifier;
		};

		$scope.selection = {
			tabItem: 'bundles'
		};

		Bundle.query(function(data) {
	  	$scope.bundles = data;
	  });

	  $scope.tags = [];
	  $scope.users = [];
	}]);
})();