(function() {
	'use strict';
	
	var module = angular.module('pdConfigurationController', ['pdBundleService', 'pdUserService', 'pdDialogDirective']);

	module.controller('ConfigurationController', ['$scope', 'Bundle', 'User', 'Tag', function($scope, Bundle, User, Tag) {
		$scope.setTab = function(identifier) {
			$scope.selection.tabItem = identifier;
		};

		$scope.selection = {
			tabItem: 'bundles',
			bundle: null
		};

		$scope.selectBundle = function(bundle) {
			if ($scope.selection.bundle && $scope.selection.bundle._id === bundle._id) {
				$scope.selection.bundle = null;
			} else {
				$scope.selection.bundle = bundle;
			}
		};

		$scope.enableToolNew = function() {
			return true;
		};

		$scope.enableToolEdit = function() {
			return $scope.selection.bundle;
		};

		$scope.enableToolDelete = function() {
			return $scope.selection.bundle;
		};

		$scope.enableToolUp = function() {
			return $scope.selection.bundle;
		};

		$scope.enableToolDown = function() {
			return $scope.selection.bundle;
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

	  $scope.newBundleDialog = {
	  	body: 'views/configuration/bundleDialogBody.html',
	  	footer: 'views/configuration/bundleDialogFooter.html',
	  	id: 'newBundleDialog',
	  	title: 'Create new bundle'
	  };

	  $scope.showNewBundleDialog = function() {
	  	$('#' + $scope.newBundleDialog.id).modal('show');
	  };
	}]);
})();