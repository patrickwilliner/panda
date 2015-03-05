(function() {
	'use strict';
	
	var module = angular.module('pdApp', ['pdLinkController', 'pdConfigurationController', 'ngRoute']);

	module.config(['$routeProvider',
		function($routeProvider) {
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
		}
	]);

	module.controller('ApplicationController', ['$scope', '$location', function($scope, $location) {
	  $scope.user = {
	  	login: 'wipa',
	  	lastName: 'Williner',
	  	firstName: 'Patrick'
	  };

	  $scope.keyListeners = [];

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
  }]);
})();