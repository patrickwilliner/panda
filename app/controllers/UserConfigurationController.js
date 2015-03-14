define(['jquery'], function($) {
	'use strict';
	
	function userConfigurationController($scope, $http, User) {
		function createUser() {
			$http({
          method: 'post',
          url: '/api/users',
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.newBundleDialog.id).modal('hide');
      	loadBundles();
      });
		}

		function updateUser() {
			$http({
          method: 'put',
          url: '/api/bundles/' + $scope.form._id,
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.editBundleDialog.id).modal('hide');
      	loadBundles();
      });
		}

		function loadUsers() {
			User.query(function(data) {
		  	$scope.users = data;
		  });
		}

		$scope.selection = {
			user: null
		};

		$scope.selectUser = function(user) {
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
			return $scope.selection.user;
		};

		$scope.enableToolDelete = function() {
			return $scope.selection.user;
		};

	  $scope.newUserDialog = {
	  	bodyUrl: 'views/configuration/bundleDialogBody.html',
	  	footerUrl: 'views/configuration/bundleDialogFooter.html',
	  	id: 'newBundleDialog',
	  	title: 'Create new bundle',
	  	submit: function() {
	  		createBundle();
	  	}
	  };

	  $scope.editUserDialog = {
	  	bodyUrl: 'views/configuration/bundleDialogBody.html',
	  	footerUrl: 'views/configuration/bundleDialogFooter.html',
	  	id: 'editBundleDialog',
	  	title: 'Edit bundle',
	  	submit: function() {
	  		updateBundle();
	  	}
	  };
	  
	  $scope.showNewUserDialog = function() {
	  	$scope.form = {
		  	label: ''
		  };

	  	$('#' + $scope.newUserDialog.id).modal('show');
	  };

	  $scope.showEditUserDialog = function() {
	  	$scope.form = {
	  		_id: $scope.selection.bundle._id,
		  	label: $scope.selection.bundle.label
		  };

	  	$('#' + $scope.editBundleDialog.id).modal('show');
	  };

	  $scope.deleteUser = function() {
	  	if (window.confirm('Are you sure?')) {
				$http({
          method: 'delete',
          url: '/api/bundles/' + $scope.selection.bundle._id,
          data: $scope.form
      	}).success(function() {
      		loadBundles();
      	});
			}
	  };

	  loadUsers();
	}

	userConfigurationController.$inject = ['$scope', '$http', 'User'];
	return userConfigurationController;
});