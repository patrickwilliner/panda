define([], function() {
	function applicationConfig($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'views/home/index.html'
			}).
			when('/links', {
				templateUrl: 'views/link/index.html',
				controller: 'linkController'
			}).
			when('/configuration', {
				templateUrl: 'views/configuration/index.html',
				controller: 'configurationController'
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

	applicationConfig.$inject = ['$routeProvider', '$locationProvider'];
	return applicationConfig;
});