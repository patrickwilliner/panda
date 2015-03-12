'use strict';

require.config({
	baseUrl: '/',
	paths: {
		'angular': 'bower_components/angular/angular',
		'angular-resource': 'bower_components/angular-resource/angular-resource',
		'angular-route': 'bower_components/angular-route/angular-route',
		'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
		'jquery': 'bower_components/jquery/dist/jquery'
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angular-resource': [
			'angular'
		],
		'angular-route': [
			'angular'
		],
		'bootstrap': {
			'deps': [
				'jquery'
			]
		}
	},
	deps: [
		'bootstrap'
	]
});


require(['angular', 'modules/applicationModule'],
  function(angular) {
    angular.bootstrap(document, ['pandaApp']);
  }
);