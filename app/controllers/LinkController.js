(function() {
	'use strict';
	
	var module = angular.module('pdLinkController', ['pdLinkService', 'pdBundleService', 'pdBundleDirective', 'pdDialogDirective', 'pdDomainFilter', 'pdTagService']);

	module.controller('LinkController', ['$scope', '$http', 'Link', 'Bundle', 'Tag', function($scope, $http, Link, Bundle, Tag) {
		$scope.setBundle = function(bundle) {
			$scope.select(null);
			$scope.selection.bundle = bundle;

			$http.get('/api/bundles/' + bundle._id + '/links').
			  success(function(data, status, headers, config) {
			  	$scope.selection.links = data;
			  }).
			  error(function(data, status, headers, config) {
			    console.log(data, status);
		  });
		};

		$scope.select = function(link) {
			if (!link) {
				$scope.selection.link = null;
			}

			if ($scope.selection.link && $scope.selection.link._id === link._id) {
				$scope.selection.link = null;
			} else {
				$scope.selection.link = link;
			}
		};

		$scope.enableToolNew = function() {
			return $scope.selection.bundle;
		};

		$scope.enableToolEdit = function() {
			return $scope.selection.link;
		};

		$scope.enableToolDelete = function() {
			return $scope.selection.link;
		};

	  $scope.showNewDialog = function() {
	  	$scope.form = {
	  		bundle: $scope.selection.bundle._id,
		  	url: '',
		  	label: ''
		  };
		  
	  	$('#' + $scope.newLinkDialog.id).modal('show');
	  };

	  $scope.showEditDialog = function() {
	  	$scope.form = {
	  		bundle: $scope.selection.bundle._id,
		  	url: $scope.selection.link.url,
		  	label: $scope.selection.link.label
		  };
		  
	  	$('#' + $scope.editLinkDialog.id).modal('show');
	  };

		$scope.createLink = function() {
			$http({
          method: 'post',
          url: '/api/links',
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.newLinkDialog.id).modal('hide');
      	$scope.setBundle($scope.selection.bundle);
      });
		};

		$scope.updateLink = function() {
			$http({
          method: 'put',
          url: '/api/links/' + $scope.selection.link._id,
          data: $scope.form
      }).success(function() {
      	$('#' + $scope.editLinkDialog.id).modal('hide');
      	$scope.setBundle($scope.selection.bundle);
      });
		};

		$scope.deleteLink = function() {
			if (window.confirm('Are you sure?')) {
				$http({
          method: 'delete',
          url: '/api/links/' + $scope.selection.link._id,
          data: $scope.form
      	}).success(function() {
      		$scope.setBundle($scope.selection.bundle);
      	});
			}
		};

		function loadTitle() {
			if ($scope.form.url) {
				$http({
          method: 'get',
          url: '/api/load_page_title/?url=' + encodeURIComponent($scope.form.url)
      	}).success(function(data) {
      		$scope.form.label = data;
      	});
			}
		}

		Bundle.query(function(data) {
	  	$scope.bundles = data;

	  	if (data && data[0]) {
	  		$scope.setBundle(data[0]);
	  	}
	  });

		$scope.selection = {
			bundle: {}
		};

		$scope.newLinkDialog = {
	  	id: 'newLinkDialog',
	  	title: 'Create New Link',
	  	submit: $scope.createLink,
	  	formId: 'newLinkForm',
	  	loadTitle: loadTitle
	  };

	  $scope.editLinkDialog = {
	  	id: 'editLinkDialog',
	  	title: 'Edit Link',
	  	submit: $scope.updateLink,
	  	formId: 'editLinkForm'
	  };	  
	}]);
})();