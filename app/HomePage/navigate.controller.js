(function() {
	    'use strict';
	
	    angular
	        .module('app')
	        .controller('indexController', indexController);
	
	    indexController.$inject = ['storageFactory', '$state', '$rootScope'];
	    
	    /* @ngInject */
	    function indexController(storageFactory, $state, $rootScope) {
	        var vm = this;
	        vm.title = 'indexController';
			$rootScope.id;
	        activate();
	
	        ////////////////
	
	        function activate() {
	        	if ( !storageFactory.getLocalStorage('userInfo') ) {
                	console.log("User not signed in yet");
                	vm.id = "0";
            	}
            	console.log(vm.id);
	        }
	        
	        vm.clearStorage = function() {
	        	storageFactory.clearAllLocalStorage();
	        	$state.go('home');
	        }
	    }
})();