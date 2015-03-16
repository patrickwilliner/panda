/**
 * Directive which is used for form validation. The directive defines a certain model field which must be
 * equal to this field's model value.
 */
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