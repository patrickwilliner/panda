define([], function() {
	'use strict';

	function sessionService($http) {
        return {
            // TODO review this
            getUser: function(callback) {
                $http.get('/api/session').
                    success(function(data, status, headers, config) {
                        callback(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data, status);
                    });
            }
        }
	}

    sessionService.$inject = ['$http'];
	return sessionService;
});