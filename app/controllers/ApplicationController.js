(function() {
	'use strict';
	
	var module = angular.module('pdApp', ['pdUserService', 'pdLinkController', 'pdConfigurationController', 'ngRoute']);

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

	module.controller('ApplicationController', ['$scope', 'UserService', function($scope, userService) {
	  $scope.user = {
	  	login: 'wipa',
	  	lastName: 'Williner',
	  	firstName: 'Patrick'
	  };
  }]);
})();