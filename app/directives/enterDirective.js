define([], function() {
	'use strict';
	
	function pdEnterDirective() {
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
	}

	return pdEnterDirective;
});