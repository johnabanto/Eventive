(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    homeController.$inject = ['toastr'];
    
    /* @ngInject */
    function homeController(toastr) {
        var vm = this;
        vm.title = 'homeController';

        activate();

        ////////////////

        function activate() {
        }
    }

})();