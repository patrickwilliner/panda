define([], function() {
    function interceptor($window) {
        return {
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    $window.location.href = '/login';
                }
            }
        };
    }

    interceptor.$inject = ['$window'];
    return interceptor;
});