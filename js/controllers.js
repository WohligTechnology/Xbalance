angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    //  // Form data for the login modal
    //  $scope.loginData = {};
    //
    //  // Create the login modal that we will use later
    //  $ionicModal.fromTemplateUrl('templates/login.html', {
    //    scope: $scope
    //  }).then(function(modal) {
    //    $scope.modal = modal;
    //  });
    //
    //  // Triggered in the login modal to close it
    //  $scope.closeLogin = function() {
    //    $scope.modal.hide();
    //  };
    //
    //  // Open the login modal
    //  $scope.login = function() {
    //    $scope.modal.show();
    //  };
    //
    //  // Perform the login action when the user submits the login form
    //  $scope.doLogin = function() {
    //    console.log('Doing login', $scope.loginData);
    //
    //    // Simulate a login delay. Remove this and replace with your login
    //    // code if using a login system
    //    $timeout(function() {
    //      $scope.closeLogin();
    //    }, 1000);
    //  };
})


.controller('HomeCtrl', function ($scope, $ionicModal) {
        $ionicModal.fromTemplateUrl('templates/popsearch.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };

    })
    .controller('SearchCtrl', function ($scope) {})
    .controller('ShopCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout) {
        $scope.aImages = [{
            'src': '../img/shop1.png',
            //            'msg': 'Swipe me to the left. Tap/click to close'
     }, {
            'src': '../img/shop2.png',
            //            'msg': ''
      }, {
            'src': '../img/shop3.png',
            //            'msg': ''
    }];
        $scope.aImagess = [{
            'src': '../img/product1.png',
            //            'msg': 'Swipe me to the left. Tap/click to close'
     }, {
            'src': '../img/product2.png',
            //            'msg': ''
      }, {
            'src': '../img/product3.png',
            //            'msg': ''
    }];

        $ionicModal.fromTemplateUrl('templates/purchase.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        };

        $scope.closeModalss = function () {
            $scope.modal.hide();
        };

        $ionicModal.fromTemplateUrl('templates/image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modals = modal;
        });

        $scope.openpswd = function () {
            $scope.modals.show();
        };

        $scope.closeModal = function () {
            $scope.modals.hide();
        };

        $ionicModal.fromTemplateUrl('templates/image-shop.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modalss = modal;
        });

        $scope.openshops = function () {
            $scope.modalss.show();
        };

        $scope.closeModals = function () {
            $scope.modalss.hide();
        };

        //popup
        $scope.showPopup = function () {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Please Wait for the Approval!</p>',
                title: 'Your Request Sent!',
                scope: $scope,

            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        };
    })

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('LoginCtrl', function ($scope, $stateParams) {})

.controller('FaqCtrl', function ($scope, $stateParams) {})

.controller('SellingCtrl', function ($scope, $stateParams, $ionicPopup, $timeout) {
        $scope.showPopup = function () {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Accepted!</p>',
                title: 'Accept',
                scope: $scope,

            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        };
        $scope.showPopups = function () {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopups = $ionicPopup.show({
                template: '<div class="text-center"><h2 class="ion-close-round balanced round-circle rounds-x"></h2><p>Decline!</p>',
                title: 'Decline!',
                scope: $scope,

            });
            $timeout(function () {
                myPopups.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        };

    })
    .controller('TransactionCtrl', function ($scope, $stateParams) {})

.controller('AboutCtrl', function ($scope, $stateParams) {})

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate) {


        $scope.aImages = [{
            'src': 'http://ionicframework.com/img/ionic-logo-blog.png',
            //            'msg': 'Swipe me to the left. Tap/click to close'
     }, {
            'src': 'http://ionicframework.com/img/ionic_logo.svg',
            //            'msg': ''
      }, {
            'src': 'http://ionicframework.com/img/homepage/phones-weather-demo@2x.png',
            //            'msg': ''
    }];

        //        $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        //            scope: $scope,
        //            animation: 'slide-in-up'
        //        }).then(function (modal) {
        //            $scope.modal = modal;
        //        });
        //
        //        $scope.openModal = function () {
        //            $ionicSlideBoxDelegate.slide(0);
        //            $scope.modal.show();
        //        };
        //
        //        $scope.closeModal = function () {
        //            $scope.modal.hide();
        //        };
        //
        //        // Cleanup the modal when we're done with it!
        //        $scope.$on('$destroy', function () {
        //            $scope.modal.remove();
        //        });
        //        // Execute action on hide modal
        //        $scope.$on('modal.hide', function () {
        //            // Execute action
        //        });
        //        // Execute action on remove modal
        //        $scope.$on('modal.removed', function () {
        //            // Execute action
        //        });
        //        $scope.$on('modal.shown', function () {
        //            console.log('Modal is shown!');
        //        });
        //
        //        // Call this functions if you need to manually control the slides
        //        $scope.next = function () {
        //            $ionicSlideBoxDelegate.next();
        //        };
        //
        //        $scope.previous = function () {
        //            $ionicSlideBoxDelegate.previous();
        //        };
        //
        //        $scope.goToSlide = function (index) {
        //            $scope.modal.show();
        //            $ionicSlideBoxDelegate.slide(index);
        //        }
        //
        //        // Called each time the slide changes
        //        $scope.slideChanged = function (index) {
        //            $scope.slideIndex = index;
        //        };
        //                $ionicModal.fromTemplateUrl('templates/resetpswd.html', {
        $ionicModal.fromTemplateUrl('templates/resetpswd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        };

        $scope.closeModals = function () {
            $scope.modal.hide();
        };
        $ionicModal.fromTemplateUrl('templates/image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modals = modal;
        });

        $scope.openpswd = function () {
            $scope.modals.show();
        };

        $scope.closeModal = function () {
            $scope.modals.hide();
        };
    })
    .controller('YourBalCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout) {
        $ionicModal.fromTemplateUrl('templates/addbalance.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        }

        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        //popup
        $scope.showPopup = function () {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Your Request has been sent.</p>',
                title: 'Your Request Sent!',
                scope: $scope,

            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        };
    });