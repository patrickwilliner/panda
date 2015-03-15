define(['jquery', 'lib/selection/model'], function ($, SelectionModel) {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ARROW_UP = 38;
    var KEY_ARROW_DOWN = 40;

    function linkController($scope, $http, Link) {
        function getSelectedBundle() {
            return $scope.$parent.model.getSelectedElement();
        }

        function getSelectedLink() {
            return $scope.model.getSelectedElement();
        }

        function reloadBundle() {
            $scope.$parent.reloadBundles();
        }

        function selectPreviousLink() {
            $scope.model.selectPrevious();
        }

        function selectNextLink() {
            $scope.model.selectNext();
        }

        function transformTagString() {
            $scope.form.tags = $scope.form.tagString.split(',');

            for (var i = 0; i < $scope.form.tags.length; i++) {
                $scope.form.tags[i] = $scope.form.tags[i].trim();
            }
        }

        function loadLinks() {
            var bundle = $scope.$parent.model.getSelectedElement();

            if (bundle && bundle.isSearch) {
                $http.get('/api/links/search/?search=' + bundle.searchText).
                    success(function(data, status, headers, config) {
                        $scope.model.setElements(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data, status);
                    });
            } else if (bundle && bundle.isTag) {
                $http.get('/api/links/search/?tag=' + bundle.tag).
                    success(function(data, status, headers, config) {
                        $scope.model.setElements(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data, status);
                    });
            } else if (bundle) {
                // reload links
                $http.get('/api/bundles/' + bundle._id + '/links').
                    success(function(data, status, headers, config) {
                        $scope.model.setElements(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data, status);
                    });
            }
        }

        $scope.selectLink = function (link) {
            if ($scope.model.isSelected(link)) {
                $scope.model.clearSelection();
            } else {
                $scope.model.select(link);
            }
        };

        $scope.enableToolNew = function () {
            var selectedBundle = $scope.$parent.model.getSelectedElement();
            return selectedBundle && !selectedBundle.isSearch && !selectedBundle.isTag;
        };

        $scope.enableToolEdit = function () {
            return $scope.model.hasSelection();
        };

        $scope.enableToolDelete = function () {
            return $scope.model.hasSelection();
        };

        $scope.showNewDialog = function () {
            $scope.form = {
                bundle: getSelectedBundle()._id,
                url: '',
                label: '',
                tagString: ''
            };

            $('#' + $scope.newLinkDialog.id).modal('show');
        };

        $scope.showEditDialog = function () {
            $scope.form = {
                bundle: getSelectedBundle()._id,
                url: getSelectedLink().url,
                label: getSelectedLink().label,
                tagString: getSelectedLink().tags.join(', ')
            };

            $('#' + $scope.editLinkDialog.id).modal('show');
        };

        $scope.createLink = function () {
            transformTagString();

            $http({
                method: 'post',
                url: '/api/links',
                data: $scope.form
            }).success(function () {
                    $('#' + $scope.newLinkDialog.id).modal('hide');
                    reloadBundle();
                });
        };

        $scope.updateLink = function () {
            transformTagString();

            $http({
                method: 'put',
                url: '/api/links/' + $scope.form._id,
                data: $scope.form
            }).success(function () {
                    $('#' + $scope.editLinkDialog.id).modal('hide');
                    reloadBundle();
                });
        };

        $scope.deleteLink = function () {
            if (window.confirm('Are you sure?')) {
                $http({
                    method: 'delete',
                    url: '/api/links/' + getSelectedLink()._id
                }).success(function () {
                    reloadBundle();
                });
            }
        };

        function loadTitle() {
            if ($scope.form.url) {
                $http({
                    method: 'get',
                    url: '/api/load_page_title/?url=' + encodeURIComponent($scope.form.url)
                }).success(function (data) {
                    $scope.form.label = data;
                });
            }
        }

        $scope.newLinkDialog = {
            id: 'newLinkDialog',
            title: 'Create New Link',
            submit: $scope.createLink,
            formId: 'newLinkForm',
            loadTitle: loadTitle
        };

        $scope.editLinkDialog = {
            id: 'editLinkDialog',
            title: 'Edit Link',
            submit: $scope.updateLink,
            formId: 'editLinkForm'
        };

        $scope.registerKeyListener(function (e) {
            if ($scope.model.hasSelection()) {
                switch (e.keyCode) {
                    case KEY_ARROW_UP:
                        selectPreviousLink();
                        break;
                    case KEY_ARROW_DOWN:
                        selectNextLink();
                        break;
                    case KEY_ENTER:
                        console.log('todo: implement action for pressing enter key');
                }
            }
        });

        function linkComparator(link1, link2) {
            return link1._id === link2._id;
        }

        function bundleListener() {
            loadLinks();
        }

        $scope.model = new SelectionModel(null, linkComparator);
        $scope.$parent.model.registerListener(bundleListener);
    }

    linkController.$inject = ['$scope', '$http', 'Link'];
    return linkController;
});