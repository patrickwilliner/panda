(function() {
	'use strict';
	
	var module = angular.module('pdEnterDirective', []);

	module.directive('pdEnter', [function () {
		return function($scope, element, attrs) {
			element.bind('keydown keypress', function(event) {
          if(event.which === 13) {
              $scope.$apply(function (){
                  $scope.$eval(attrs.pdEnter);
              });

              event.preventDefault();
          }
      });
		};
	}]);
})();