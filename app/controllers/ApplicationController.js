define(['jquery'], function ($) {
    'use strict';

    function applicationController($scope, $location, $window, Session) {
        function init() {
            // set session user
            Session.getUser(function(user) {
                $scope.sessionUser = user;
            });

            // set search text
            $scope.searchText = '';

            // set key listeners
            $scope.keyListeners = [];
        }

        $scope.registerKeyListener = function (listener) {
            $scope.keyListeners.push(listener);
        };

        $scope.onKeyDown = function ($event) {
            $scope.keyListeners.forEach(function (listener) {
                listener($event);
            });
        };

        $scope.getNavClass = function (path) {
            return $location.path().indexOf(path) === 0 ? 'active' : '';
        };

        $scope.search = function () {
            $location.path('/links').search({search: $scope.searchText});
        };

        $scope.showPwDialog = function () {
            $('#pwDialog').modal('show');
        };

        $scope.logout = function () {
            $window.location.href = '/logout';
        };

        init();
    }

    applicationController.$inject = ['$scope', '$location', '$window', 'Session'];
    return applicationController;
});