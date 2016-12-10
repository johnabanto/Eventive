(function() {
    'use strict';

    angular
        .module('app')
        .controller('aboutUsController', aboutUsController);

    aboutUsController.$inject = ['toastr'];
    
    /* @ngInject */
    function aboutUsController(toastr) {
        var vm = this;
        vm.title = 'aboutUsController';

        activate();

        ////////////////

        function activate() {
        }
    }
})();