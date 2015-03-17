define(['jquery'], function ($) {
    'use strict';

    function navbarController($scope, $location, $window, $http, Session) {
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

        function logout() {
            $window.location.href = '/logout';
        }

        $scope.enableSetPw = function() {
            return !$scope.sessionUser.system;
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
            id: 'changeSessionUserPwDialog',
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

        $scope.logout = logout;
    }

    navbarController.$inject = ['$scope', '$location', '$window', '$http', 'Session'];
    return navbarController;
});