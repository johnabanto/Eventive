(function() {
    'use strict';

    angular
        .module('app')
        .controller('upcomingEventsController', upcomingEventsController);

    upcomingEventsController.$inject = ['toastr', 'EventsFactory', 'storageFactory', '$state', '$location', '$anchorScroll', '$rootScope'];
    
    /* @ngInject */
    function upcomingEventsController(toastr, EventsFactory, storageFactory, $state, $location, $anchorScroll, $rootScope) {
        var vm = this;
        vm.title = 'upcomingEventsController';
        vm.events;
        vm.map = { center: { latitude: 32.716851, longitude:  -117.165237 }, zoom: 14 };

        activate();

        ////////////////

        function activate() {
            EventsFactory.getAllEvents().then(
                function(response){
                    console.log(response);

                    vm.events = response;
                });

            if ( !storageFactory.getLocalStorage('userInfo') ) {
                console.log("User not signed in yet");
                vm.id = "0";
            }
            else {
                vm.id = storageFactory.getLocalStorage('userInfo')._id;
                vm.name = storageFactory.getLocalStorage('userInfo').name;
                vm.number = storageFactory.getLocalStorage('userInfo').number;
                vm.token = storageFactory.getLocalStorage('token');
                console.log(vm.token);
            }

        }

        $rootScope.goToEvent = function(eventId) {
            $location.hash(eventId);
            $anchorScroll();
        }

        vm.alreadyInEvent = function(userId, attendees) {
            if (userId == 0) return "0";
            var len = attendees.length;
            for (var i = 0; i < len; i++) {
                if (userId === attendees[i].attendeeid) {
                    console.log("user attending this event");
                    return "1"
                }
            }
            return "2";
        }

        vm.addToEvent = function(eventId) {
            console.log(eventId);
            if (vm.id == "0") $state.go("login");
            else if (vm.id !== "0"){
                EventsFactory.addToEvent(eventId, vm.id, vm.name, vm.number, vm.token).then(
                    function(response){
                        console.log(response);

                        vm.updatedEvent = response;
                        $state.go('profile');
                    })
            } else {
                console.log("This shouldn't be seen");
            }
            console.log("Going to Login");
        }

        vm.sendUserReminder = function(eventId, eventName, address, date) {
            EventsFactory.sendUserMessage(vm.name, vm.number, eventName, address, date, vm.token, eventId).then(
                function(response) {
                    console.log(response);
                }, 
                function(error) {
                    toastr.error(error);
                });
        }

        
    }
})();