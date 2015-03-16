/*
 * Angular configuration.
 */
define(['interceptors/unauthorizedInterceptor'], function(unauthorizedInterceptor) {
	function applicationConfig($routeProvider, $locationProvider, $httpProvider) {
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

        // register interceptors
        $httpProvider.interceptors.push(unauthorizedInterceptor);
	}

	applicationConfig.$inject = ['$routeProvider', '$locationProvider', '$httpProvider'];
	return applicationConfig;
});