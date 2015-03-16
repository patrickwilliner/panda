define([
	'config/applicationConfig',
	'controllers/ApplicationController',
	'controllers/ConfigurationController',
	'controllers/LinkController',
    'controllers/LinkDetailController',
	'controllers/UserConfigurationController',
	'controllers/TagConfigurationController',
	'controllers/BundleConfigurationController',
    'controllers/NavbarController',
	'services/BundleService',
	'services/LinkService',
	'services/SessionService',
	'services/TagService',
	'services/UserService',
	'directives/bundleDirective',
	'directives/dialogDirective',
	'directives/enterDirective',
	'directives/flagIconDirective',
	'directives/linkDialogDirective',
    'directives/equalsDirective',
	'filters/domainFilter',
	'angular-route',
	'angular-resource'
	], function(
		applicationConfig,
		applicationController,
		configurationController,
		linkController,
        linkDetailController,
		userConfigurationController,
		tagConfigurationController,
		bundleConfigurationController,
        navbarController,
		bundleService,
		linkService,
		sessionService,
		tagService,
		userService,
		bundleDirective,
		dialogDirective,
		enterDirective,
		flagIconDirective,
		linkDialogDirective,
        equalsDirective,
		domainFilter) {
	var module = angular.module('pandaApp', ['ngRoute','ngResource']);

	module.config(applicationConfig);

    // register controllers
	module.controller('applicationController', applicationController);
	module.controller('configurationController', configurationController);
	module.controller('linkController', linkController);
    module.controller('linkDetailController', linkDetailController);
	module.controller('userConfigurationController', userConfigurationController);
	module.controller('tagConfigurationController', tagConfigurationController);
	module.controller('bundleConfigurationController', bundleConfigurationController);
    module.controller('navbarController', navbarController);

    // register services
	module.factory('Bundle', bundleService);
	module.factory('Link', linkService);
	module.factory('Session', sessionService);
	module.factory('Tag', tagService);
	module.factory('User', userService);

    // register directives
	module.directive('pdBundle', bundleDirective);
	module.directive('pdDialog', dialogDirective);
	module.directive('pdEnter', enterDirective);
	module.directive('pdFlagIcon', flagIconDirective);
	module.directive('pdLinkDialog', linkDialogDirective);
    module.directive('pdEquals', equalsDirective);

    // register filters
	module.filter('pdDomain', domainFilter);
});