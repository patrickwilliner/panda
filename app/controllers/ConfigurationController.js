(function() {
	'use strict';
	
	var module = angular.module('pdConfigurationController', ['pdBundleService', 'pdUserService', 'pdDialogDirective']);

	module.controller('ConfigurationController', ['$scope', '$http', 'Bundle', 'User', 'Tag', function($scope, $http, Bundle, User, Tag) {
		function createBundle() {
			$http({
          method: 'post',
          url: '/api/bundles',
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.newBundleDialog.id).modal('hide');
      });
		}

		function updateBundle() {
			$http({
          method: 'put',
          url: '/api/bundles/' + $scope.form._id,
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.newBundleDialog.id).modal('hide');
      });
		}

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
			return $scope.selection.bundle && $scope.selection.bundle._id !== $scope.bundles[0]._id;
		};

		$scope.enableToolDown = function() {
			return $scope.selection.bundle && $scope.selection.bundle._id !== $scope.bundles[$scope.bundles.length - 1]._id;
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
	  	bodyUrl: 'views/configuration/bundleDialogBody.html',
	  	footerUrl: 'views/configuration/bundleDialogFooter.html',
	  	id: 'newBundleDialog',
	  	title: 'Create new bundle',
	  	submit: function() {
	  		createBundle();
	  	}
	  };

	  $scope.editBundleDialog = {
	  	bodyUrl: 'views/configuration/bundleDialogBody.html',
	  	footerUrl: 'views/configuration/bundleDialogFooter.html',
	  	id: 'editBundleDialog',
	  	title: 'Edit bundle',
	  	submit: function() {
	  		updateBundle();
	  	}
	  };

	  $scope.showNewBundleDialog = function() {
	  	$scope.form = {
		  	label: ''
		  };

	  	$('#' + $scope.newBundleDialog.id).modal('show');
	  };

	  $scope.showEditBundleDialog = function() {
	  	$scope.form = {
	  		_id: $scope.selection.bundle._id,
		  	label: $scope.selection.bundle.label
		  };

	  	$('#' + $scope.editBundleDialog.id).modal('show');
	  };

	  $scope.deleteBundle = function() {
	  	if (window.confirm('Are you sure?')) {
				$http({
          method: 'delete',
          url: '/api/bundles/' + $scope.selection.bundle._id,
          data: $scope.form
      	}).success(function() {
      		$scope.setBundle($scope.selection.bundle);
      	});
			}
	  };
	}]);
})();