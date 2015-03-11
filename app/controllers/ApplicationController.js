(function() {
	'use strict';
	
	var module = angular.module('pdApp', ['pdLinkController', 'pdConfigurationController', 'pdEnterDirective', 'pdFlagIconDirective', 'ngRoute']);

	module.config(['$routeProvider', '$locationProvider',
		function($routeProvider, $locationProvider) {
			$routeProvider.
				when('/', {
					templateUrl: 'views/home/index.html'
				}).
				when('/links', {
					templateUrl: 'views/link/index.html',
					controller: 'LinkController'
				}).
				when('/configuration', {
					templateUrl: 'views/configuration/index.html',
					controller: 'ConfigurationController'
				}).
				when('/about', {
					templateUrl: 'views/about/index.html'
				}).
				otherwise({
					redirectTo: '/'
				});

				// pretty urls - no hashs in url
				$locationProvider.html5Mode(true);
		}
	]);

	module.controller('ApplicationController', ['$scope', '$location', function($scope, $location) {
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
  }]);
})();