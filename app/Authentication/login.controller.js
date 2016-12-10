(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['toastr', 'AuthFactory', '$q', '$state', 'storageFactory', 'localStorageService'];
    
    /* @ngInject */
    function loginController(toastr, AuthFactory, $q, $state, storageFactory, localStorageService) {
        var vm = this;
        vm.title = 'loginController';
        var token;
        activate();

        ////////////////

        function activate() {
        }

        function setStorage(key, value) {
            storageFactory.setLocalStorage(key, value)
                console.log("User info successfully stored");
                return;
        }

        function getStorage(key){
            storageFactory.getLocalStorage(key)
                console.log("User info have been taken");
                return;
        }

        // passes email and password to grab token, and then passes token to grab user info
        vm.login = function() {
            var defer = $q.defer();

            console.log('passing values');
            AuthFactory.verify(vm.email, vm.password, 0, 0, 'login').then(
                function(response){
                    token = response.token; // grabs token
                    console.log(token);
                    AuthFactory.getProfile(token).then(
                        function(response){

                            console.log(response); // grabs profile

                            setStorage('userInfo', response);
                            setStorage('token', token);
                            if (response.role === "attendee") $state.go("profile");
                            else $state.go("organizer");
                        });
                },
                function (error) {
                    toastr.error('Please register an account');

                    vm.email = " ";
                    vm.password = " ";
                })
        }
    }
})();