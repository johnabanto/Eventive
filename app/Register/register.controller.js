(function() {
    'use strict';

    angular
        .module('app')
        .controller('registerController', registerController);

    registerController.$inject = ['toastr'];
    
    /* @ngInject */
    function registerController(toastr) {
        var vm = this;
        vm.title = 'registerController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();