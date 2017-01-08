(function() {
    'use strict';

    angular
        .module('app')
        .controller('organizerController', organizerController);

    organizerController.$inject = ['toastr', 'storageFactory', 'EventsFactory', '$state', '$stateParams', 'Upload', '$scope', 'wineServer', 'imageFactory', '$location', '$anchorScroll'];
    
    /* @ngInject */
    function organizerController(toastr, storageFactory, EventsFactory, $state, $stateParams, Upload, $scope, wineServer, imageFactory, $location, $anchorScroll) {
        var vm = this;
        vm.title = 'organizerController';
        vm.editor = 'static';
        vm.date = new Date();
        vm.date2 = new Date();
        vm.levels = ['NOVICE', 'INTERMEDIATE', 'ADVANCED', 'REMBRANDT'];
        vm.max = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        vm.editUpcomingEvent = false;
        activate();
        

        ////////////////

        function activate() {
            if (storageFactory.getLocalStorage('userInfo').role == "attendee") $state.go('profile');
        	vm.email = storageFactory.getLocalStorage('userInfo').email;
            vm.password = storageFactory.getLocalStorage('userInfo').password;
            vm.number = storageFactory.getLocalStorage('userInfo').number;
            vm.name = storageFactory.getLocalStorage('userInfo').name;
            vm.id = storageFactory.getLocalStorage('userInfo')._id;
            vm.token = storageFactory.getLocalStorage('token');

            EventsFactory.getEventsCompany(vm.id, vm.token).then(
                function(response) {
                    vm.events = response;
                    console.log(vm.events);
                },
                function(error) {
                    toastr.error("Something went wrong in the profile controller.")
                })
        }

        $scope.goToEditor = function() {
            $location.hash('editor');
            $anchorScroll;
        }

        vm.postNewEvent = function(eventName, companyName, companyid, datetime, address, token, long, lat, description, diff, maxCount) {
            console.log(diff);
            EventsFactory.getCoordFromAddress(address).then(
                function(response) {
                    vm.long = response.results[0].geometry.location.lng;
                    vm.lat = response.results[0].geometry.location.lat;

                    EventsFactory.addEvent(eventName, companyName, companyid, datetime, address, token, vm.long, vm.lat, description, diff, maxCount).then(
                        function(response) {
                            console.log(response);
                            $state.reload();
                        },
                        function(error) {
                            toastr.error("There was a problem posting this event to the database");
                        })

                },
                function(error) {
                    toastr.error("We couldn't figure out this address");
                });
        }

        vm.deleteEvent = function(eventId, token) {
            EventsFactory.removeEvent(eventId, token).then(
                function(response) {
                    console.log(response);
                    $state.reload();
                },
                function(error) {
                    toastr.error("There was a problem deleting this event");
                });
        }

        vm.editEvent = function(eventId, eventName, companyName, companyid, datetime, address, token, long, lat, description, diff, maxCount) {
            
            EventsFactory.getCoordFromAddress(address).then(
                function(response) {
                    console.log(response);
                    vm.long = response.results[0].geometry.location.lng;
                    vm.lat = response.results[0].geometry.location.lat;
                    EventsFactory.editEvent(eventId, eventName, companyName, companyid, datetime, address, token, vm.long, vm.lat, description, diff, maxCount).then(
                        function(response) {
                            console.log(response);
                            $state.reload();
                        },
                        function(error) {
                            toastr.error("There was a problem editing this event");
                        })
                },
                function(error) {
                    toastr.error("We had a problem trying to submit this address, please try again.");
                })
        }

        vm.sendMessage = function(eventId, eventName, eventAddress, eventAttendees, token, date) {
            EventsFactory.sendMessage(eventId, eventName, eventAddress, eventAttendees, token, date).then(
                function(response) {
                    console.log(response);
                    toastr.success("Messages sent!");
                },
                function(error) {
                    toastr.error("Error sending messages: " + error);
                }) 
        }

        $scope.upload = function(file, userId) {
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

        $scope.uploadPainting = function(file, eventId) {
            Upload.upload({
                url: wineServer + 'files/' + eventId + '/painting', 
                data: {
                    "filefield": file
                }
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

    }
})();