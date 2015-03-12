define(['jquery'], function($) {
	'use strict';

	function applicationController($scope, $location) {
		function init() {
			// set user until authentification system is implemented
			$scope.user = {
		  	login: 'wipa',
		  	lastName: 'Williner',
		  	firstName: 'Patrick'
	  	};

	  	// set search text
	  	$scope.searchText = '';

	  	// set key listeners
	  	$scope.keyListeners = [];
		}

	  $scope.registerKeyListener = function(listener) {
	  	$scope.keyListeners.push(listener);
	  };

	  $scope.onKeyDown = function($event) {
	  	$scope.keyListeners.forEach(function(listener) {
	  		listener($event);
	  	});
	  };

	  $scope.getNavClass = function(path) {
    	return $location.path().indexOf(path) === 0 ? 'active' : '';
		};

		$scope.search = function() {
			$location.path('/links').search({search: $scope.searchText});
		};

		$scope.showPwDialog = function() {
	  	$('#pwDialog').modal('show');
	  };

	  init();
	}

	applicationController.$inject = ['$scope', '$location'];
	return applicationController;
});