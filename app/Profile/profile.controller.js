(function() {
    'use strict';

    angular
        .module('app')
        .controller('profileController', profileController);

    profileController.$inject = ['toastr', 'storageFactory', 'EventsFactory', '$state', '$stateParams', 'imageFactory', 'Upload', '$scope', 'wineServer'];
    
    /* @ngInject */
    function profileController(toastr, storageFactory, EventsFactory, $state, $stateParams, imageFactory, Upload, $scope, wineServer) {
        var vm = this;
        vm.title = 'profileController';
        vm.editor = 'static';
 
        activate();

        ////////////////

        function activate() {
            console.log("here");
            if (storageFactory.getLocalStorage('userInfo').role == "organizer") $state.go('organizer');
            vm.email = storageFactory.getLocalStorage('userInfo').email;
            vm.password = storageFactory.getLocalStorage('userInfo').password;
            vm.number = storageFactory.getLocalStorage('userInfo').number;
            vm.name = storageFactory.getLocalStorage('userInfo').name;
            vm.id = storageFactory.getLocalStorage('userInfo')._id;
            vm.token = storageFactory.getLocalStorage('token');           

            EventsFactory.getEventsByProfile(vm.id, vm.token).then(
                function(response) {
                    vm.events = response;
                    console.log(vm.events);
                },
                function(error) {
                    toastr.error("Something went wrong in the profile controller.")
                });
            /*
            imageFactory.getImage(vm.id).then(
                function(response) {
                    console.log(vm.pic)
                    vm.pic = response;
                },
                function(error) {
                    toastr.error("There was an error getting your profile picture.")
                })
            */
        }

        vm.removeEvent = function(eventId) {
            EventsFactory.removeEventFromUser(eventId, vm.id, vm.token).then(
                function(response) {
                    console.log(response);
                    $state.reload();
                },
                function(error) {
                    toastr.error("Problem removing user from event");
                });
        }

        $scope.upload= function(file, userId) {
            Upload.upload({
                url: wineServer + 'files',
                data: {"filefield": file, "userId": userId}
            }).then(function(response) {
                console.log(response);
                $state.reload();
            },
            function(error) {
                toastr.error("Problem uploading photo")
            })
        }

        function setStorage(key, value) {
            storageFactory.setLocalStorage(key, value)
                console.log("User info successfully stored");
                return;
        }

        vm.editProfile = function(userId, token, name, email, number) {
            imageFactory.editProfile(userId, token, name, email, number).then(
                function(response) {
                    console.log(response);
                    setStorage('userInfo', response);
                    vm.name = response.name;
                    vm.email = response.email;
                    vm.number = response.number;
                    $state.reload();
                }, 
                function(error) {
                    toastr.error("There was a problem submitting the edit");
                })
        }

        vm.sendUserReminder = function(eventId, eventName, address, date) {
            console.log("This is working")
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