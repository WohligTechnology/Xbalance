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
        'src': 'http://lorempixel.com/g/100/100/?1',
        'srclg': 'http://lorempixel.com/g/100/100/?1',
        'msg': 'Swipe me to the left. Tap/click to close'
     }, {
        'src': 'http://lorempixel.com/g/100/100/?2',
        'srclg': 'http://lorempixel.com/g/100/100/?2',
        'msg': 'Title Two'
      }, {
        'src': 'http://lorempixel.com/g/100/100/?3',
        'srclg': 'http://lorempixel.com/g/100/100/?3',
        'msg': 'Title Three'
      }, {
        'src': 'http://lorempixel.com/g/100/100/?4',
        'srclg': 'http://lorempixel.com/g/100/100/?4',
        'msg': 'Title Four'
      }, {
        'src': 'http://lorempixel.com/g/100/100/?5',
        'srclg': 'http://lorempixel.com/g/100/100/?5',
        'msg': 'Title Two'
      }, {
        'src': 'http://lorempixel.com/g/100/100/?6',
        'srclg': 'http://lorempixel.com/g/100/100/?6',
        'msg': 'Title Three'
    }];

    $ionicModal.fromTemplateUrl('image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function () {
        $scope.modal.show();
        // Important: This line is needed to update the current ion-slide's width
        // Try commenting this line, click the button and see what happens
        $ionicSlideBoxDelegate.update();
    };

    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });
    $scope.$on('modal.shown', function () {
        console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function () {
        $ionicSlideBoxDelegate.next();
    };

    $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function (index) {
        $scope.slideIndex = index;
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