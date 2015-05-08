var globalfunctionapproval = {};

angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $location) {
    //your balance
    var yourbalancecallback = function(data, status) {

        if (data == "false") {

            console.log("no data");
        } else {
            console.log(data);
            $scope.pb = data;
            //            $location.url("/app/selling");
        }
    }
    $scope.yourbalance = function() {
        $scope.bal = $.jStorage.get("user1");
        console.log($scope.bal);
        MyServices.yourbalance($scope.bal, yourbalancecallback);
    }
    $scope.approvalcount = 0;
    var sellingapprovalcallback = function(data, status) {
        $scope.approvalcount = data.sellingapproval.length;
        console.log(data.sellingapproval.length);
    }
    $scope.sell = $.jStorage.get("user1");
    MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
    globalfunctionapproval = function() {
        MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
    };

})

.controller('HomeCtrl', function($scope, MyServices, $ionicModal, $location, $ionicPopup, $timeout) {
    //home page
    $scope.home = {
        area: "",
        category: "",
        membershipno: ""
    };

    var userid = $.jStorage.get("user1");
    if (!userid) {
        $location.url("/login");
    }

    var homecallback = function(data, status) {
        $scope.user = data;

        $.jStorage.set("user", data.userdetails);
        user = data.userdetails;
        //		$location.url("/app/search");
    };
    $scope.user = $.jStorage.get("user1");
    MyServices.home($scope.user, homecallback);

    function onmembershipid(shopid) {
        if (shopid) {
            $location.url("/app/shop/" + shopid);
        } else {
            $scope.showPopup();
        }
    };


    $scope.showPopup = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">No Such Membership Number Exists.</p>',
            title: 'No Match Found!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopupNoBalance = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your Purchase Balance is too low.</p>',
            title: 'Low Purchase Balance',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    //search shop

    $scope.memfunc = function(home) {

        purchasebalance = parseFloat(user.purchasebalance);
        if (purchasebalance > 0) {
            if (home.membershipno != "") {
                MyServices.getshopidmebership(home.membershipno, onmembershipid);
            } else {
                var area = 0;
                var category = 0;
                if (home.area != "") {
                    area = home.area;
                }
                if (category != "") {
                    category = home.category;
                }
                $location.url("/app/search/" + home.area + "/" + home.category);
            }
        } else {
            $scope.showPopupNoBalance();
        }

    }



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
    $scope.d = {};

})

.controller('SearchCtrl', function($scope, MyServices, $ionicModal, $location, $stateParams) {

    var searchcallback = function(data, status) {
        $scope.shops = data;

    }
    MyServices.searchresult($stateParams.area, $stateParams.category, $stateParams.membershipno, searchcallback);
    var getareacategorycallback = function(data, status) {
        $scope.recall = data;
        console.log(data);
    }
    MyServices.getareacategory($stateParams.area, $stateParams.category, getareacategorycallback);



    $scope.demo = [];
    var searchcallback = function(data, status) {
        console.log(data);
        $scope.demo = data;
        $.jStorage.set("demo", data);
    };


})

.controller('ShopCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, MyServices, $stateParams) {


    function purchaseoverlimit() {
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Purchase is Overlimit!</p>',
            title: 'OverLimit Purchase!',
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    }


    $scope.purchaselimit = parseFloat(user.purchasebalance);
    $scope.userpurchasebalance = parseFloat(user.purchasebalance);
    var shopprofilecallback = function(data, status) {
        $scope.profile = data;

        var newsalesbalance = parseFloat($scope.profile.salesbalance);
        if (newsalesbalance < $scope.purchaselimit) {
            $scope.purchaselimit = newsalesbalance;
        }
        console.log($scope.profile);
    }
    shopid = $stateParams.id;
    $scope.shopid = $stateParams.id;
    $scope.userid = user.id;
    console.log(shopid);
    MyServices.profile(shopid, shopprofilecallback);
    var shopphotocallback = function(data, status) {
        $scope.shoppic = data;
        console.log($scope.shoppic);
        for (var i = 0; i < $scope.shoppic.length; i++) {
            $scope.shoppic[i].photo = imgpath + $scope.shoppic[i].photo;
        }
        console.log($scope.shoppic);
    }
    $scope.amount = 1000;
    var shopproductphotocallback = function(data, status) {
        $scope.img = data;
        for (var i = 0; i < $scope.img.length; i++) {
            $scope.img[i].photo = imgpath + $scope.img[i].photo;
        }
        console.log($scope.img);
    }
    MyServices.shopphoto(shopid, shopphotocallback);
    MyServices.shopproductphoto(shopid, shopproductphotocallback);


    $scope.callpurchase = function(profile) {
        $scope.modal.show();
    };

    var purchaserequestcallback = function(data, status) {

        if (data == "false") {

            console.log("balance not added");
        } else {
            console.log("balance added");
        }
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Please Wait for the Approval!</p>',
            title: 'Your Request Sent!',
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };





    $scope.sendamt = function(amount, reason) {

        amount = parseFloat(amount);
        if (amount > $scope.purchaselimit) {
            purchaseoverlimit();
        } else {

            $scope.amt = amount;
            console.log($scope.amt);
            $scope.userfrom = $.jStorage.get("user1");
            //		console.log($scope.pid.shopprofile[0].id);
            MyServices.purchaserequest($scope.userfrom, shopid, amount, reason, purchaserequestcallback);
        }
        $scope.modal.hide();
    };

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


})

.controller('LoginCtrl', function($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout) {
    $.jStorage.flush();

    $scope.user1 = {
        membershipno: "",
        password: ""
    };

    var logincallback = function(data, status) {
        if (data == "false") {
            console.log(data);
            console.log("Login Failed");
            $scope.showPopup();
        } else {
            //			console.log(data);
            data = data.replace('"', "");
            //			console.log(data);
            data = parseInt(data);
            console.log(data);
            user1 = data;
            $.jStorage.set("user1", data);
            $location.url("/app/home");
        }

    };

    $scope.showPopup = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Incorrect Membership Number or Password.</p>',
            title: 'Login Failed',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };


    $scope.onlogin = function(user1) {
        MyServices.login(user1, logincallback);
    };
})

.controller('FaqCtrl', function($scope, $stateParams) {})

.controller('SellingCtrl', function($scope, $stateParams, $ionicPopup, $timeout, MyServices, $ionicLoading) {



    //SELLING APPROVAL

    var sellingapprovalcallback = function(data, status) {
        $scope.req = data.sellingapproval;
        console.log($scope.req);
        $ionicLoading.hide();
    }
    $scope.sell = $.jStorage.get("user1");
    console.log($scope.sell);
    MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
    $scope.showPopup = function() {
        $scope.data = {}

        // An elaborate, custom popup

    };

    var acceptstatuscallback = function(data, status) {
        console.log(data);
        MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
        globalfunctionapproval();

    }
    $scope.reason = "";
    $scope.accept = function(r, reason) {

        console.log(r);
        MyServices.accepted(r.id, reason, 1, acceptstatuscallback);
        $ionicLoading.show({
            template: 'Please wait...'
        });
    }
    $scope.decline = function(r, reason) {
        console.log("Decline");
        console.log(r);
        MyServices.accepted(r.id, reason, 2, acceptstatuscallback);
        $ionicLoading.show({
            template: 'Please wait...'
        });
    }


})

.controller('TransactionCtrl', function($scope, $stateParams, $ionicPopup, $location, MyServices) {
    //	
    var transactioncallback = function(data, status) {
        $scope.t = data;
        console.log($scope.t);
    }
    $scope.trans = $.jStorage.get("user1");
    MyServices.transaction($scope.trans, transactioncallback);


    //  DECLARATION
    $scope.returnsactive = "active";
    $scope.purchased = "bold";
    //    $scope.user = [];

    //  DESIGN CODE
    $scope.changepurchase = function() {
        $scope.purchased = "bold";
        $scope.sale = "";
        $scope.admin = "";
    }

    $scope.chnagesale = function() {
        $scope.purchased = "";
        $scope.sale = "bold";
        $scope.admin = "";
    }
    $scope.chnageadmin = function() {
        $scope.purchased = "";
        $scope.sale = "";
        $scope.admin = "bold";
    }


    //  GET USER DETAILS
    //    $scope.user = MyServices.getuser();

})

.controller('AboutCtrl', function($scope, $stateParams) {

})

.controller('ProfileCtrl', function($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate, MyServices, $http) {
    // shop profile
    $scope.pro = $.jStorage.get("user1");
    $scope.epro = {};
    var shopphotocallback = function(data, status) {
        $scope.pic = data;
        console.log($scope.pic);

    }
    var shopproductphotocallback = function(data, status) {
        $scope.image = data;

    }
    var shopprofilecallback = function(data, status) {

        $scope.profile = data.shopprofile[0];
        console.log($scope.profile);
    }

    MyServices.profile($scope.pro, shopprofilecallback);
    MyServices.shopphoto($scope.pro, shopphotocallback);
    MyServices.shopproductphoto($scope.pro, shopproductphotocallback);
    //edit profile
    $scope.editpro = function(profile) {
        $scope.epro = profile;
        console.log($scope.epro);
    }
    //    $scope.sp=$.jStorage.get("sp");
    //	console.log("In profile");
    ////	console.log($scope.sp);
    ////	
    var updateprofilecallback = function(data, status) {
        if (data == "false") {

            console.log("no data");
        } else {
            console.log("Updated");
        }
    }
    $scope.profileupdate = function(profile) {
        $scope.updatedata = profile;
        console.log($scope.updatedata);
        $scope.id = $.jStorage.get("user1");
        console.log($scope.id);
        MyServices.updateprofile($scope.id, $scope.updatedata, updateprofilecallback);

    }
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
    var changepasswordcallback = function(data, status) {
        $scope.p = data;
        console.log($scope.p);
        $scope.oModal2.hide();
    }
    $scope.changepass = function(pass) {
        $scope.passwrd = pass;
        $scope.id = $.jStorage.get("user1");
        $scope.passwrd = pass;
        MyServices.changepassword($scope.id, $scope.passwrd, changepasswordcallback)
    }
})

.controller('YourBalCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, MyServices) {
    var balanceaddcallback = function(data, status) {
        if (data == "false") {

            console.log("balance not added");
        } else {
            console.log("balance added");
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Your Request has been sent.</p>',
                title: 'Your Request Sent!',
                scope: $scope,

            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
            //            $location.url("/app/home");
        }
    };
    $scope.user = $.jStorage.get("user1");
    $scope.addbalance = function(amount) {
        $scope.a = amount;
        console.log($scope.a);
        MyServices.balanceadd($scope.user, $scope.a, balanceaddcallback);
    };
    //	$scope.amount = 0;

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