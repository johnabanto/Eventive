(function() {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['toastr'];
    
    /* @ngInject */
    function loginController(toastr) {
        var vm = this;
        vm.title = 'loginController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();