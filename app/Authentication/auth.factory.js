(function() {
    'use strict';
    angular
        .module('app')
        .factory('AuthFactory', AuthFactory);
    AuthFactory.$inject = ['$http', '$q', 'wineServer'];
    /* @ngInject */
    function AuthFactory($http, $q, wineServer) {
        var service = {
            verify: verify,
            getProfile: getProfile
        };
        return service;
        ////////////////
        // grabs token with option for registration or login
        function verify(email, password, number, name, type) {
        	var defer = $q.defer();
        	var bodyData;
        	// if login use only email and password, otherwise use all data fields
        	if (type === 'login') {
        		bodyData = {
        			"email": email,
        			"password": password
        		}
        	} else {
        		bodyData = {
        			"email": email,
        			"name": name,
        			"number": number,
                    "role": "attendee",
        			"password": password
        		}
        	}

        	// grabs token and returns it
        	$http({
        		method: 'POST',
        		url: wineServer + type,
        		data: bodyData,
        		headers: {
        			'Content-Type': 'application/json'
        		}
        	}).then(function(response) {
        		if (typeof response.data === 'object'){
        			defer.resolve(response.data);
        		} else {
        			defer.reject(response);
        		}
        	}, 
        	function(error) {
        		defer.reject(error);
        	});
            console.log(defer.promise);
        	return defer.promise;
        }

        //once token is passed grabs profile of user
    	function getProfile(token) {
    		var defer = $q.defer();

    		$http({
    			method: 'GET',
    			url: wineServer + 'profile',
    			headers: {
    				'Authorization': 'Bearer ' + token
    			}
    		})
    		.then(function(response){
    			if (typeof response.data === 'object'){
        			defer.resolve(response.data);
        		} else {
        			defer.reject(response);
        		}
        	}, 
        	function(error) {
        		defer.reject(error);
    		});

    		return defer.promise;
    	}
    }
})();