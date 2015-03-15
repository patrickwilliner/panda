define(['lib/selection/model'], function(SelectionModel) {
    'use strict';

    function bundleController($scope, $location, Bundle) {
        function loadBundles(callback) {
            Bundle.query(function(bundles) {
                var searchBundle;
                $scope.model.setElements(bundles);

                if ($location.search().hasOwnProperty('search')) {
                    searchBundle = {
                        label: 'Search Result',
                        isSearch: true,
                        searchText: $location.search().search
                    };

                    $scope.model.prepend(searchBundle);
                } else if ($location.search().hasOwnProperty('tag')) {
                    searchBundle = {
                        label: 'Tag "' + $location.search().tag + '"',
                        isTag: true,
                        tag: $location.search().tag
                    };

                    $scope.model.prepend(searchBundle);
                }

                if (callback) {
                    callback();
                }
            });
        }

        function bundleComparator(bundle1, bundle2) {
            return bundle1._id === bundle2._id;
        }

        $scope.select = function(bundle) {
            $scope.model.select(bundle);
        };

        $scope.reloadBundles = function() {
            var bundle = $scope.model.getSelectedElement();
            loadBundles(function() {
                $scope.model.select(bundle);
            });
        };

        $scope.model = new SelectionModel(null, bundleComparator);

        loadBundles(function() {
            $scope.model.selectFirst();
        });
    }

    bundleController.$inject = ['$scope', '$location', 'Bundle'];
    return bundleController;
});