define([], function() {
    'use strict';

    function pdEqualsDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                otherValue: '=pdEquals'
            },
            link: function($scope, element, attributes, ngModel) {
                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue === $scope.otherValue;
                };

                $scope.$watch('otherValue', function() {
                    ngModel.$validate();
                });
            }
        };
    }

    return pdEqualsDirective;
});