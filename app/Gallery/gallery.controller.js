(function() {
    'use strict';

    angular
        .module('app')
        .controller('galleryController', galleryController);

    galleryController.$inject = ['toastr'];
    
    /* @ngInject */
    function galleryController(toastr) {
        var vm = this;
        vm.title = 'galleryController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();