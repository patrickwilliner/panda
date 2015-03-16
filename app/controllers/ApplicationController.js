define(['jquery'], function ($) {
    'use strict';

    function applicationController($scope, $location, $window, $http, Session) {
        function init() {
            // set session user
            Session.getUser(function(user) {
                $scope.sessionUser = user;
            });

            // init search text
            $scope.searchText = '';

            // init key listeners
            $scope.keyListeners = [];
        }

        function setPassword() {
            $http({
                method: 'put',
                url: '/api/users/' + $scope.form._id + '/setpw',
                data: {
                    password: $scope.form.password
                }
            }).success(function () {
                $('#' + $scope.setPwDialog.id).modal('hide');
            });
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

        $scope.setPwDialog = {
            bodyUrl: 'views/configuration/user/pwDialogBody.html',
            footerUrl: 'views/configuration/user/dialogFooter.html',
            id: 'setPwDialog',
            title: 'Change Password',
            formId: 'setPwForm',
            submit: function () {
                setPassword();
            }
        };

        $scope.showPwDialog = function () {
            $scope.form = {
                _id: $scope.sessionUser._id,
                password: '',
                confirmPassword: ''
            };

            $('#' + $scope.setPwDialog.id).modal('show');
        };

        $scope.logout = function () {
            $window.location.href = '/logout';
        };

        init();
    }

    applicationController.$inject = ['$scope', '$location', '$window', '$http', 'Session'];
    return applicationController;
});