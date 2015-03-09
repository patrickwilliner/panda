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
      	loadBundles();
      });
		}

		function updateBundle() {
			$http({
          method: 'put',
          url: '/api/bundles/' + $scope.form._id,
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.editBundleDialog.id).modal('hide');
      	loadBundles();
      });
		}

		function loadBundles() {
			Bundle.query(function(data) {
		  	$scope.bundles = data;
		  	$scope.bundles.map(function(bundle, idx) {
		  		bundle.index = idx + 1;
		  		return bundle;
		  	});
		  });
		}

		function loadUsers() {
			User.query(function(data) {
		  	$scope.users = data;
		  });
		}

		function loadTags() {
			Tag.query(function(data) {
		  	$scope.tags = data;
		  });
		}

		function swapBundles(bundle1, bundle2) {
			$http({
          method: 'post',
          url: '/api/bundles/' + bundle1._id + '/swap',
          data: {
          	id: bundle2._id
          }
      }).success(function() {
      	loadBundles();
      });
		}

		function findPreviousBundle(bundle) {
        var previous = $scope.bundles[0];

        for (var i = 1; i < $scope.bundles.length; i++) {
        	if (bundle._id === $scope.bundles[i]._id) {
        		return previous;
        	} else {
        		previous = $scope.bundles[i];
        	}
        }

        return null;
    }

    function findNextBundle(bundle) {
    	var next = $scope.bundles[$scope.bundles.length - 1];

    	for (var i = $scope.bundles.length - 2; i >= 0; i--) {
    		if (bundle._id === $scope.bundles[i]._id) {
        		return next;
        	} else {
        		next = $scope.bundles[i];
        	}
    	}

    	return null;
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

		loadBundles($scope);
		loadUsers();
		loadTags();

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
      		loadBundles();
      	});
			}
	  };

	  $scope.bundleUp = function() {
	  	var previousBundle = findPreviousBundle($scope.selection.bundle);
	  	swapBundles($scope.selection.bundle, previousBundle);
	  };

	  $scope.bundleDown = function() {
	  	var nextBundle = findNextBundle($scope.selection.bundle);
	  	swapBundles($scope.selection.bundle, nextBundle);
	  };
	}]);
})();