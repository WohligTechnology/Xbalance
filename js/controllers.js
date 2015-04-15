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


.controller('HomeCtrl', function ($scope) {})
    .controller('SearchCtrl', function ($scope) {})
    .controller('ProductCtrl', function ($scope, $stateParams, $ionicModal) {

        $ionicModal.fromTemplateUrl('templates/purchase.html', {
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

.controller('PlaylistCtrl', function ($scope, $stateParams) {})

.controller('WelcomeCtrl', function ($scope, $stateParams) {})

.controller('FaqCtrl', function ($scope, $stateParams) {})

.controller('SellingCtrl', function ($scope, $stateParams) {})
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
        $ionicModal.fromTemplateUrl('templates/image-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.openedit = function () {
            $scope.modal.show();
        };

        $scope.closeModals = function () {
            $scope.modal.close();
        };
        $ionicModal.fromTemplateUrl('templates/resetpswd.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modals = modal;
        });

        $scope.openpswd = function () {
            $scope.modals.show();
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
        };
    })
    .controller('YourBalCtrl', function ($scope, $stateParams, $ionicModal) {
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

    });