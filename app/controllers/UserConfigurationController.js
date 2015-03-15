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

        function setPassword() {
            $http({
                method: 'put',
                url: '/api/users/' + $scope.form._id + '/setpw',
                data: {
                    password: $scope.form.password
                }
            }).success(function () {
                $('#' + $scope.setPwDialog.id).modal('hide');
                loadUsers();
            });
        }

        function loadUsers() {
            User.query(function (data) {
                $scope.model.setElements(data);
            });
        }

        function userComparator(user1, user2) {
            return user1._id === user2._id;
        }


        $scope.selectUser = function (user) {
            if ($scope.model.isSelected(user)) {
                $scope.model.clearSelection();
            } else {
                $scope.model.select(user);
            }
        };

        $scope.enableToolNew = function () {
            return true;
        };

        $scope.enableToolEdit = function () {
            return $scope.model.hasSelection();
        };

        $scope.enableToolDelete = function () {
            return $scope.model.hasSelection() && !$scope.model.getSelectedElement().system;
        };

        $scope.enableToolSetPw = function () {
            return $scope.model.hasSelection();
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

        $scope.setPwDialog = {
            bodyUrl: 'views/configuration/user/pwDialogBody.html',
            footerUrl: 'views/configuration/user/dialogFooter.html',
            id: 'setPwDialog',
            title: 'Set Password',
            formId: 'setPwForm',
            submit: function () {
                setPassword();
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
                _id: $scope.model.getSelectedElement()._id,
                login: $scope.model.getSelectedElement().login,
                givenName: $scope.model.getSelectedElement().givenName,
                surname: $scope.model.getSelectedElement().surname,
                active: $scope.model.getSelectedElement().active,
                admin: $scope.model.getSelectedElement().admin
            };

            $('#' + $scope.editUserDialog.id).modal('show');
        };

        $scope.showSetPwDialog = function() {
            $scope.form = {
                _id: $scope.model.getSelectedElement()._id,
                login: $scope.model.getSelectedElement().login
            }

            $('#' + $scope.setPwDialog.id).modal('show');
        };

        $scope.deleteUser = function () {
            if (window.confirm('Are you sure?')) {
                $http({
                    method: 'delete',
                    url: '/api/users/' + $scope.model.getSelectedElement()._id
                }).success(function () {
                    loadUsers();
                });
            }
        };

        $scope.gaga = function(val) {
            console.log('gaga', val);
        };

        $scope.model = new SelectionModel(null, userComparator);
        loadUsers();
    }

    userConfigurationController.$inject = ['$scope', '$http', 'User'];
    return userConfigurationController;
});