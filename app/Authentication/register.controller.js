(function() {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    registerController.$inject = ['toastr', 'storageFactory', 'localStorageService', 'AuthFactory', '$state'];
    
    /* @ngInject */
    function registerController(toastr, storageFactory, localStorageService, AuthFactory, $state) {
        var vm = this;
        vm.title = 'registerController';
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

        vm.register = function() {
        
            console.log('passing values');
            AuthFactory.verify(vm.email, vm.password, vm.number, vm.name, 'register').then(
                function(response){
                    token = response.token;
                    console.log(token);
                    AuthFactory.getProfile(token).then(
                        function(response){
                            console.log(response);

                            setStorage('userInfo', response);
                            setStorage('token', token);
                            $state.go("profile");
                            location.reload();
                            
                        })
                },
                function (error) {
                    toastr.error('Please fill out information');

                    vm.email = " ";
                    vm.password = " ";
                    vm.number = " ";
                    vm.name = " ";
                })
        }
    }
})();