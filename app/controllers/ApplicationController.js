define([], function () {
    'use strict';

    function applicationController($scope, Session) {
        function init() {
            // set session user
            Session.getUser(function(user) {
                $scope.sessionUser = user;
            });

            // init key listeners
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

        init();
    }

    applicationController.$inject = ['$scope', 'Session'];
    return applicationController;
});