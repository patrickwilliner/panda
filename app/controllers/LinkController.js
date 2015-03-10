(function() {
	'use strict';
	
	var KEY_ENTER = 13;
	var KEY_ARROW_UP = 38;
	var KEY_ARROW_DOWN = 40;

	var module = angular.module('pdLinkController', ['pdLinkService', 'pdBundleService', 'pdBundleDirective', 'pdLinkDialogDirective', 'pdDomainFilter', 'pdTagService']);

	module.controller('LinkController', ['$scope', '$http', '$location', 'Link', 'Bundle', 'Tag', function($scope, $http, $location, Link, Bundle, Tag) {
		function selectPreviousLink() {
			if ($scope.selection.links.length > 1) {
				var previousLink = findPreviousLink($scope.selection.link);
				$scope.select(previousLink);
			}
		}

		function selectNextLink() {
			if ($scope.selection.links.length > 1) {
				var nextLink = findNextLink($scope.selection.link);
				$scope.select(nextLink);
			}
		}

		function findPreviousLink(link) {
			var previous = $scope.selection.links[0];

			for (var i = 1; i < $scope.selection.links.length; i++) {
				if ($scope.selection.links[i]._id === $scope.selection.link._id) {
					return previous;
				} else {
					previous = $scope.selection.links[i];
				}
			}

			// default
			return previous;
		}

		function findNextLink(link) {
			var next = $scope.selection.links[$scope.selection.links.length - 1];

			for (var i = $scope.selection.links.length - 2; i >= 0; i--) {
				if ($scope.selection.links[i]._id === $scope.selection.link._id) {
					return next;
				} else {
					next = $scope.selection.links[i];
				}
			}

			// default
			return next;
		}

		function transformTagString() {
			$scope.form.tags = $scope.form.tagString.split(',');

			for (var i = 0; i < $scope.form.tags.length; i++) {
				$scope.form.tags[i] = $scope.form.tags[i].trim();
			}
		}

		function loadBundles(callback) {
			Bundle.query(function(data) {
				var searchBundle;		
		  	$scope.bundles = data;

		  	if ($location.search().hasOwnProperty('search')) {
		  		searchBundle = {
			  		label: 'Search Result',
			  		isSearch: true,
			  		searchText: $location.search().search
			  	};

			  	$scope.bundles.splice(0, 0, searchBundle);
			  } else if ($location.search().hasOwnProperty('tag')) {
		  		searchBundle = {
			  		label: 'Tag "' + $location.search().tag + '"',
			  		isTag: true,
			  		tag: $location.search().tag
			  	};

			  	$scope.bundles.splice(0, 0, searchBundle);
		  	}

		  	callback();
		 	});
		}

		$scope.setBundle = function(bundle) {
			$scope.select(null);

			if (bundle.isSearch) {
				$http.get('/api/links/search/?search=' + bundle.searchText).
				  success(function(data, status, headers, config) {
				  	$scope.selection.links = data;
				  }).
				  error(function(data, status, headers, config) {
				    console.log(data, status);
			  });
			} else if (bundle.isTag) {
				$http.get('/api/links/search/?tag=' + bundle.tag).
				  success(function(data, status, headers, config) {
				  	$scope.selection.links = data;
				  }).
				  error(function(data, status, headers, config) {
				    console.log(data, status);
			  });
			} else {
				// reload bundle
				Bundle.get({id: bundle._id}, function(bundle) {
					// TODO refactor this part
				  $scope.selection.bundle = bundle;
				  for (var i = 0; i < $scope.bundles.length; i++) {
				  	if ($scope.bundles[i]._id === bundle._id) {
				  		$scope.bundles[i] = bundle;
				  	}
				  }

				  // reload links
					$http.get('/api/bundles/' + bundle._id + '/links').
					  success(function(data, status, headers, config) {
					  	$scope.selection.links = data;
					  }).
					  error(function(data, status, headers, config) {
					    console.log(data, status);
				  });
				});				
			}
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
			return $scope.selection.bundle && !$scope.selection.bundle.isSearch && !$scope.selection.bundle.isTag;
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
		  	label: '',
		  	tagString: ''
		  };
		  
	  	$('#' + $scope.newLinkDialog.id).modal('show');
	  };

	  $scope.showEditDialog = function() {
	  	$scope.form = {
	  		bundle: $scope.selection.bundle._id,
		  	url: $scope.selection.link.url,
		  	label: $scope.selection.link.label,
		  	tagString: $scope.selection.link.tags.join(', ')
		  };
		  
	  	$('#' + $scope.editLinkDialog.id).modal('show');
	  };

		$scope.createLink = function() {
			transformTagString();
			
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
			transformTagString();

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

		loadBundles(function() {
			if ($scope.bundles && $scope.bundles[0]) {
		  	$scope.setBundle($scope.bundles[0]);
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

	  $scope.registerKeyListener(function(e) {	
	  	if ($scope.selection.link) {
	  		switch (e.keyCode) {
	  			case KEY_ARROW_UP:
	  				selectPreviousLink();
	  				break;
  				case KEY_ARROW_DOWN:
  					selectNextLink();
	  				break;
	  			case KEY_ENTER:
	  				console.log('todo: implement action for pressing enter key');
	  		}
		  }
	  });
	}]);
})();