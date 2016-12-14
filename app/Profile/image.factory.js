(function() {
    'use strict';
    angular
        .module('app')
        .factory('imageFactory', imageFactory);
    imageFactory.$inject = ['$http', '$q', 'wineServer', 'Upload'];
    /* @ngInject */
    function imageFactory($http, $q, wineServer, Upload) {
        var service = {
            getImage: getImage,
            postImage: postImage,
            editProfile: editProfile
        };
        return service;
        ////////////////
        function getImage(userId) {
        	var defer = $q.defer();

        	$http({
        		method: 'GET',
        		url: wineServer + 'files/' + userId, 
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
        	return defer.promise;
        }

        function postImage(userId, file, errFiles) {
        	var defer = $q.defer();

        	if (file) {
        		file.upload = Upload.upload({
        			url: 'wineServer' + 'files',
        			data: {
        				'filefield': file,
        				'userId': userId
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
        	return defer.promise;
        	}
        }

        function editProfile(userId, token, name, email, number) {
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: wineServer + 'profile/' + userId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    "name": name,
                    "email": email,
                    "number": number
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