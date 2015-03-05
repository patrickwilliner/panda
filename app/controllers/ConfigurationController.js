(function() {
	'use strict';
	
	var module = angular.module('pdConfigurationController', ['pdBundleService', 'pdUserService']);

	module.controller('ConfigurationController', ['$scope', 'Bundle', 'User', function($scope, Bundle, User) {
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

	  User.query(function(data) {
	  	$scope.users = data;
	  });
	}]);
})();