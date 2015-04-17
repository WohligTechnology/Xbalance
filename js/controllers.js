angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('HomeCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/popsearch.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };

})

.controller('SearchCtrl', function($scope) {})

.controller('ShopCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout) {
    $scope.aImages = [{
        'src': 'img/shop1.png',

    }, {
        'src': 'img/shop2.png',

    }, {
        'src': 'img/shop3.png',

    }];
    $scope.aImagess = [{
        'src': 'img/product1.png',

    }, {
        'src': 'img/product2.png',

    }, {
        'src': 'img/product3.png',

    }];

    $ionicModal.fromTemplateUrl('templates/purchase.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function() {
        $scope.modal.show();
    };

    $scope.closeModalss = function() {
        $scope.modal.hide();
    };

    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modals = modal;
    });

    $scope.openpswd = function() {
        $scope.modals.show();
    };

    $scope.closeModal = function() {
        $scope.modals.hide();
    };

    $ionicModal.fromTemplateUrl('templates/image-shop.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalss = modal;
    });

    $scope.openshops = function() {
        $scope.modalss.show();
    };

    $scope.closeModals = function() {
        $scope.modalss.hide();
    };

    //popup
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Please Wait for the Approval!</p>',
            title: 'Your Request Sent!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };
})


.controller('LoginCtrl', function($scope, $stateParams) {})

.controller('FaqCtrl', function($scope, $stateParams) {})

.controller('SellingCtrl', function($scope, $stateParams, $ionicPopup, $timeout) {
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Accepted!</p>',
            title: 'Accept',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };
    $scope.showPopups = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopups = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-close-round balanced round-circle rounds-x"></h2><p>Decline!</p>',
            title: 'Decline!',
            scope: $scope,

        });
        $timeout(function() {
            myPopups.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };

})

.controller('TransactionCtrl', function($scope, $stateParams) {

})

.controller('AboutCtrl', function($scope, $stateParams) {

})

.controller('ProfileCtrl', function($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate) {

    $ionicModal.fromTemplateUrl('templates/resetpswd.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal2 = modal;
    });

    $scope.openPassword = function() {
        $scope.oModal2.show();
    };

    $scope.closePassword = function() {
        $scope.oModal2.hide();
    };

})

.controller('YourBalCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout) {

    $ionicModal.fromTemplateUrl('templates/addbalance.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function() {
        $scope.modal.show();
    }

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    //popup
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Your Request has been sent.</p>',
            title: 'Your Request Sent!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };
});