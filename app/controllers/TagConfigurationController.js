define(['jquery'], function($) {
	'use strict';
	
	function tagConfigurationController($scope, Tag) {
		function loadTags() {
			Tag.query(function(data) {
		  	$scope.tags = data;
		  });
		}

		loadTags();
	}

	tagConfigurationController.$inject = ['$scope', 'Tag'];
	return tagConfigurationController;
});