define(['jquery', 'lib/selection/model'], function ($, SelectionModel) {
    'use strict';

    function userConfigurationController($scope, $http, User) {
        function createUser() {
            $http({
                method: 'post',
                url: '/api/users',
                data: $scope.form
            }).success(function () {
                $('#' + $scope.newUserDialog.id).modal('hide');
                loadUsers();
            });
        }

        function updateUser() {
            $http({
                method: 'put',
                url: '/api/users/' + $scope.form._id,
                data: $scope.form
            }).success(function () {
                $('#' + $scope.editUserDialog.id).modal('hide');
                loadUsers();
            });
        }

        function loadUsers() {
            User.query(function (data) {
                $scope.users = data;
                $scope.selection.setElements(data);
            });
        }

        function userComparator(user1, user2) {
            return user1._id === user2._id;
        }


        $scope.selectUser = function (user) {
            if ($scope.selection.isSelected(user)) {
                $scope.selection.clearSelection();
            } else {
                $scope.selection.select(user);
            }
        };

        $scope.enableToolNew = function () {
            return true;
        };

        $scope.enableToolEdit = function () {
            return $scope.selection.hasSelection();
        };

        $scope.enableToolDelete = function () {
            return $scope.selection.hasSelection();
        };

        $scope.newUserDialog = {
            bodyUrl: 'views/configuration/user/dialogBody.html',
            footerUrl: 'views/configuration/user/dialogFooter.html',
            id: 'newUserDialog',
            title: 'Create new user',
            submit: function () {
                createUser();
            }
        };

        $scope.editUserDialog = {
            bodyUrl: 'views/configuration/user/dialogBody.html',
            footerUrl: 'views/configuration/user/dialogFooter.html',
            id: 'editUserDialog',
            title: 'Edit user',
            submit: function () {
                updateUser();
            }
        };

        $scope.showNewUserDialog = function () {
            $scope.form = {
                login: '',
                givenName: '',
                surname: '',
                password: '',
                passwordConfirm: '',
                admin: false,
                active: true
            };

            $('#' + $scope.newUserDialog.id).modal('show');
        };

        $scope.showEditUserDialog = function () {
            console.log();

            $scope.form = {
                _id: $scope.selection.getSelectedElement()._id,
                login: $scope.selection.getSelectedElement().login,
                givenName: $scope.selection.getSelectedElement().givenName,
                surname: $scope.selection.getSelectedElement().surname,
                active: $scope.selection.getSelectedElement().active,
                admin: $scope.selection.getSelectedElement().admin
            };

            $('#' + $scope.editUserDialog.id).modal('show');
        };

        $scope.deleteUser = function () {
            if (window.confirm('Are you sure?')) {
                $http({
                    method: 'delete',
                    url: '/api/users/' + $scope.selection.getSelectedElement()._id
                }).success(function () {
                    loadUsers();
                });
            }
        };

        $scope.selection = new SelectionModel($scope.users, userComparator);
        loadUsers();
    }

    userConfigurationController.$inject = ['$scope', '$http', 'User'];
    return userConfigurationController;
});