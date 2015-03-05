(function() {
	'use strict';
	
	var module = angular.module('pdConfigurationController', ['pdBundleService', 'pdUserService']);

	module.controller('ConfigurationController', ['$scope', 'Bundle', 'User', 'Tag', function($scope, Bundle, User, Tag) {
		$scope.setTab = function(identifier) {
			$scope.selection.tabItem = identifier;
		};

		$scope.selection = {
			tabItem: 'bundles'
		};

		Bundle.query(function(data) {
	  	$scope.bundles = data;
	  });

	  User.query(function(data) {
	  	$scope.users = data;
	  });

	  Tag.query(function(data) {
	  	$scope.tags = data;
	  });
	}]);
})();