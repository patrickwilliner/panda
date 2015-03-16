define(['jquery'], function ($) {
    'use strict';

    function guideController($scope) {
        function init() {
            //$('body').scrollspy({ target: '#left-nav' })
        }

        // $scope.section is used for left navigation which depends on location.hash
        $scope.$watch(function () {
            return location.hash
        }, function (value) {
            $scope.section = value;
        });

        init();
    }

    guideController.$inject = ['$scope'];
    return guideController;
});