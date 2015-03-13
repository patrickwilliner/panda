define([
	'config/applicationConfig',
	'controllers/ApplicationController',
	'controllers/ConfigurationController',
	'controllers/LinkController',
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
	'filters/domainFilter',
	'angular-route',
	'angular-resource'
	], function(
		applicationConfig,
		applicationController,
		configurationController,
		linkController,
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
		domainFilter) {
	var module = angular.module('pandaApp', ['ngRoute','ngResource']);

	module.config(applicationConfig);

	module.controller('applicationController', applicationController);
	module.controller('configurationController', configurationController);
	module.controller('linkController', linkController);

	module.factory('Bundle', bundleService);
	module.factory('Link', linkService);
	module.factory('Session', sessionService);
	module.factory('Tag', tagService);
	module.factory('User', userService);

	module.directive('pdBundle', bundleDirective);
	module.directive('pdDialog', dialogDirective);
	module.directive('pdEnter', enterDirective);
	module.directive('pdFlagIcon', flagIconDirective);
	module.directive('pdLinkDialog', linkDialogDirective);

	module.filter('pdDomain', domainFilter);
});