var globalfunctionapproval = {};
var ref = 0;
var sorts = {};
var chintansglobal = {};

angular.module('starter.controllers', ['myservices', 'ngCordova'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading, $ionicPopup) {
    $scope.product = {};
    $scope.searchproduct = function (product) {

        $scope.p = product;
        console.log($scope.p.productname);
        console.log($scope.p.membershipno);
        console.log($scope.p.category);
        if ($scope.p.productname == undefined) {
            $scope.p.productname = 0;
        }
        if ($scope.p.membershipno == undefined) {
            $scope.p.membershipno = 0;
        }
        if ($scope.p.category == undefined) {
            $scope.p.category = 0;
        }
        $location.url("/app/products/" + $scope.p.productname + "/" + $scope.p.membershipno + "/" + $scope.p.category);
        //		MyServices.searchproduct($scope.p.productname, $scope.p.membershipno, $scope.p.category, searchproductcallback);
    }



    //Loading Package
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
    };

    //log out
    var logoutcallback = function (data, status) {
        //        $ionicLoading.hide();
        console.log("logged out");
    }
    $scope.logoutfunction = function () {
        //        $scope.showloading();
        $scope.loginid = $.jStorage.get("user1");
        console.log($scope.loginid);
        MyServices.logout($scope.loginid, logoutcallback);
    }

    //your balance
    $scope.approvalcount = 0;
    var sellingapprovalcallback = function (data, status) {
        $ionicLoading.hide();
        $scope.approvalcount = data.sellingapproval.length;
        console.log(data.sellingapproval.length);
    }
    $scope.sell = $.jStorage.get("user1");
    MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
    globalfunctionapproval = function () {
        MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
    };



})

.controller('HomeCtrl', function ($scope, MyServices, $ionicModal, $location, $ionicPopup, $timeout, $stateParams, $ionicLoading, $interval) {
    //home page

    var yourbalancecallback = function (data, status) {

        if (data == "false") {
            console.log("no data");
        } else {
            $ionicLoading.hide();
            console.log(data);
            $scope.pb = data;
        }

    }


    console.log("Your Balance Exec");
    $scope.bal = $.jStorage.get("user1");
    console.log($scope.bal);
    MyServices.yourbalance($scope.bal, yourbalancecallback);

    $scope.pullrefresh = function () {
        console.log("Do Refresh");
        MyServices.yourbalance($scope.bal, yourbalancecallback);
        $scope.showloading();
        console.log('Refresh Called');
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.varonline = 0;
    $scope.varoffline = 0;
    $scope.tabvalue = 1;
    //	$scope.productname1 = $stateParams.name;
    //	$scope.membershipno1 = $stateParams.mem;
    //	$scope.category1 = $stateParams.cat;
    //	console.log($scope.productname1);
    //	console.log($scope.membershipno1);
    //	console.log($scope.category1);
    $scope.home = {
        area: "",
        category: "",
        membershipno: ""
    };

    var userid = $.jStorage.get("user1");
    if (!userid) {
        $location.url("/login");
    }

    var homecallback = function (data, status) {
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


    $scope.showPopup = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">No such membership number exists.</p>',
            title: 'No Match Found!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopupNoBalance = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your purchase balance is too low.</p>',
            title: 'Low Purchase Balance',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    //search shop
    $scope.onlineclass = "";
    $scope.offlineclass = "";
    $scope.online = function () {
        if ($scope.varonline == 0) {
            $scope.varonline = 1;
            $scope.onlineclass = "button-activates";
        } else {
            $scope.varonline = 0;
            $scope.onlineclass = "";
        }
        console.log($scope.varonline);
    }
    $scope.offline = function () {
        if ($scope.varoffline == 0) {
            $scope.varoffline = 1;
            $scope.offlineclass = "button-activates";
        } else {
            $scope.varoffline = 0;
            $scope.offlineclass = "";
        }
        console.log($scope.varoffline);
    }

    $scope.memfunc = function (home) {

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
                    $location.url("/app/search/" + home.area + "/" + home.category + "/" + $scope.varonline + "/" + $scope.varoffline);
                }
            } else {
                $scope.showPopupNoBalance();
            }
        }
        //search product

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
    $scope.d = {};
    //GET USER PROFILE
    $scope.pro = $.jStorage.get("user1");
    var shopprofilecallback = function (data, status) {
        console.log(data);
        $scope.profileuser = data;
    }
    MyServices.profile($scope.pro, shopprofilecallback);


    //Loading Package
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

    var yourbalancecallback = function (data, status) {

        if (data == "false") {
            console.log("no data");
        } else {
            $ionicLoading.hide();
            console.log(data);
            $scope.pb = data;
        }

    }


    console.log("Your Balance Exec");
    $scope.bal = $.jStorage.get("user1");
    console.log($scope.bal);
    MyServices.yourbalance($scope.bal, yourbalancecallback);

    $scope.dorefresh = function () {
        console.log("Do Refresh");
        MyServices.yourbalance($scope.bal, yourbalancecallback);
        $scope.showloading();
        console.log('Refresh Called');
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    };
    chintansglobal.changebalance = $scope.dorefresh;

    var checkstate = function (data, status) {
        console.log(data);
        if (data == "1") {
            console.log("Facebook Login");
            $interval.cancel(stopinterval);
            ref.close();
        } else {
            console.log("Do nothing");
        }
    };

    var callAtInterval = function () {
        console.log("hey hey in inerval");
        MyServices.checkstatus($scope.orderidd, checkstate);
    };


    var balanceaddcallback = function (data, status) {
        console.log(data);
        $scope.orderidd = data;
        $scope.succurl = "http://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=" + data
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
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);

            //JAGRUTI PAYUMONEY
            ref = window.open("http://wohlig.co.in/osb/payumoney/paymentgateway.php?orderid=" + data + "&firstname=" + $scope.profileuser.shopname + "&amount=" + $scope.add.amount + "&email=" + $scope.profileuser.shopemail + "&phone=" + $scope.profileuser.shopcontact2 + "&productinfo=xbalance&surl=http://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=" + data + "&furl=wohlig.com", '_blank', 'location=no');

            stopinterval = $interval(callAtInterval, 2000);
            ref.addEventListener('exit', function (event) {
                $interval.cancel(stopinterval);
            });

        }
    };
    $scope.addbalance = function (amount, reason) {
        $scope.user = $.jStorage.get("user1");
        $scope.a = amount;
        $scope.b = reason;
        $scope.allvalidation = [{
            field: $scope.a,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            console.log("valid");
            console.log($scope.a, $scope.b);
            MyServices.balanceadd($scope.user, $scope.a, balanceaddcallback, $scope.b);

        } else {
            console.log("not valid");
            $scope.showPopup7();
        }
    }
    $scope.showPopup7 = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Its Mandatory</p>',
            title: 'Enter Amount!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
    };

    //	$scope.user = $.jStorage.get("user1");
    //	$scope.addbalance = function (amount, reason) {
    //		$scope.a = amount;
    //		$scope.b = reason;
    //		console.log($scope.a, $scope.b);
    //		MyServices.balanceadd($scope.user, $scope.a, balanceaddcallback, $scope.b);
    //	};
    //	$scope.amount = 0;
    $scope.amount = 1000;
    $scope.percent = parseFloat(user.percentpayment);

    $ionicModal.fromTemplateUrl('templates/addbalance.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.add = {
        amountinr: 0,
        amount: 0,
        reason: ""
    };

    $scope.changeamountinr = function (amount) {
        $scope.add.amountinr = amount * $scope.percent / 100;
    };
    $scope.changeamount = function (amountinr) {
        $scope.add.amount = amountinr / $scope.percent * 100;
    };

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



    //PAY U MONEY



    $scope.topayment = function () {
        ref = window.open("http://wohlig.co.in/osb/payumoney/paymentgateway.php?orderid=909&firstname=jagrytu&amount=98&email=jagruti@wohlig.com&phone=0987654345&productinfo=xbalance&surl=htttp://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=909&furl=wohlig.com", '_blank', 'location=no');

        //        stopinterval = $interval(callAtInterval, 10000);
    }




})

.controller('ProductCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading, $ionicPopup, $timeout) {
    //    $scope.productname1 = $stateParams.name;
    //    $scope.membershipno1 = $stateParams.mem;
    //    $scope.category1 = $stateParams.cat;
    //	 $scope.product = {};
    //	if($scope.productname1==0){
    //	   $scope.productname1="";
    //	   }
    //		if($scope.membershipno1==0){
    //	   $scope.membershipno1="";
    //	   }
    //	 $scope.product.productname=$scope.productname1
    //       $scope.product.membershipno = $scope.membershipno1 ;
    //    console.log($scope.productname1);
    //    console.log($scope.membershipno1);
    //    console.log($scope.category1);
    //	$scope.content={};
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $ionicLoading.hide();

    };

    $scope.sorting = 0;
    var fulldatasorted = [];
    $scope.getsort = function (content) {
            $scope.showloading();
            $scope.modal1.hide();
            console.log($scope.sprfull);
            if (content == 0) {

                fulldatasorted = _.sortBy($scope.sprfull, function (n) {
                    return parseFloat(n.price);
                });
                console.log(fulldatasorted);
                $scope.spr = partitionarray(fulldatasorted, 3);


            } else if (content == 1) {
                fulldatasorted = _.sortBy($scope.sprfull, function (n) {
                    return -1 * parseFloat(n.price);
                });
                console.log(fulldatasorted);
                $scope.spr = partitionarray(fulldatasorted, 3);
            }
        }
        //product detail
    var getsingleproductcallback = function (data, status) {
        $scope.getpro = data;
        $ionicLoading.hide();
        //			console.log($scope.getsinglepro);
    }
    $scope.getproduct = function (id) {
        $scope.showloading();
        console.log(id);
        MyServices.getsingleproduct(id, getsingleproductcallback);
        $location.url("/app/productdetail/" + id);
    }
    $scope.showPopupw = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Wrong Membership Number Entered!!</p>',
            title: 'Sorry!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    var searchproductcallback = function (data, status) {
            $ionicLoading.hide();
            //		console.log(data);
            $scope.spr = data;
            $scope.sprfull = data;
            console.log($scope.spr);
            if ($scope.spr == "-1") {
                $scope.showPopupw();
                $location.url("/app/home");
            } else {
                $scope.spr = partitionarray($scope.spr, 3);
                console.log("partition data");
                console.log($scope.spr);
                //		console.log($scope.spr);

                $scope.product.productname = $stateParams.name;
                if ($scope.product.productname == 0)
                    $scope.product.productname = "";
                $scope.product.category = $stateParams.cat;

                $scope.product.membershipno = $stateParams.mem;
                if ($scope.product.membershipno == 0)
                    $scope.product.membershipno = "";
            }
        }
        //	MyServices.searchproduct($stateParams.name, $stateParams.mem, $stateParams.cat, searchproductcallback);
    MyServices.searchproduct($stateParams.name, $stateParams.mem, $stateParams.cat, searchproductcallback);
    $scope.showloading();
    $scope.i = $.jStorage.get("user1");

    var homecallback = function (data, status) {
        $scope.area = data.area;
        data.category.unshift({
            id: "0",
            name: "All"
        });
        $scope.category = data.category;
    }
    MyServices.home($scope.i, homecallback);
    $scope.product = {};
    $scope.product.productname = $scope.productname1;
    $scope.product.membershipno = $scope.membershipno1;

    $ionicModal.fromTemplateUrl('templates/modal-sort.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

    $scope.opensort = function () {
        $scope.modal1.show();
    };

    $scope.closesort = function () {
        $scope.modal1.hide();
    };
})

.controller('SearchCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading) {
    //Loading Package
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
    };
    $scope.showloading();


    var searchcallback = function (data, status) {
        $ionicLoading.hide();
        $scope.shops = data;

    }
    MyServices.searchresult($stateParams.area, $stateParams.category, $stateParams.online, $stateParams.offline, searchcallback);
    $scope.showloading();
    var getareacategorycallback = function (data, status) {
        $scope.recall = data;
        $ionicLoading.hide();
        console.log(data);
    }
    MyServices.getareacategory($stateParams.area, $stateParams.category, getareacategorycallback);



    $scope.demo = [];
    var searchcallback = function (data, status) {
        console.log(data);
        $scope.demo = data;
        $.jStorage.set("demo", data);
    };


})

.controller('ShopCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, MyServices, $stateParams, $ionicLoading, $ionicSlideBoxDelegate) {

    //Loading Package
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

    function purchaseoverlimit() {
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Purchase is Overlimit!</p>',
            title: 'Overlimit Purchase!',
            scope: $scope,
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    }


    $scope.purchaselimit = parseFloat(user.purchasebalance);
    $scope.userpurchasebalance = parseFloat(user.purchasebalance);
    var shopprofilecallback = function (data, status) {
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
    var shopphotocallback = function (data, status) {
        $scope.shoppic = data;
        $ionicLoading.hide();
    }
    $scope.amount = 1000;
    var shopproductphotocallback = function (data, status) {
        $scope.img = data;

    }
    MyServices.shopphoto(shopid, shopphotocallback);
    MyServices.shopproductphoto(shopid, shopproductphotocallback);


    $scope.callpurchase = function (profile) {
        $scope.modal.show();
    };

    var purchaserequestcallback = function (data, status) {

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
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };


    $scope.sendamt = function (amount, reason) {

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

    $scope.send = {
        amount: 0,
        reason: ""
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
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openedit = function () {
        $scope.modal.show();
    };

    $scope.closeModalss = function () {
        $scope.modal.hide();
    };
    //SHOP IMAGE
    $ionicModal.fromTemplateUrl('templates/image-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modals = modal;
    });

    $scope.openpswd = function (num) {
        console.log(num);
        $scope.modals.show();
        setTimeout(function () {
            $ionicSlideBoxDelegate.slide(num);
        }, 200);

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

    $scope.openshops = function (num) {
        console.log(num);
        $scope.modalss.show();
        setTimeout(function () {
            $ionicSlideBoxDelegate.slide(num);
        }, 200);
    };

    $scope.closeModals = function () {
        $scope.modalss.hide();
    };


})

.controller('LoginCtrl', function ($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout, $ionicModal, $ionicLoading) {
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $ionicModal.fromTemplateUrl('templates/registration.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal1 = modal;
    });

    $scope.openreg = function () {
        $scope.oModal1.show();
    };

    $scope.closereg = function () {
        $scope.oModal1.hide();
    };


    var token = $.jStorage.get("token");
    $.jStorage.flush();
    token = $.jStorage.set("token", token);

    $scope.user1 = {
        membershipno: "",
        password: ""
    };

    //become a member start
    var becomeamembercallback = function (data, status) {
        console.log(data);
        if (data == "0") {
            console.log("No data found");
        } else {
            $scope.showPopup2();
            console.log("successfull registration");
            $scope.register = [];
            $scope.oModal1.hide();
        }
    }
    $scope.register = [];
    $scope.registerval = function (register) {

        $scope.allvalidation = [{
            field: $scope.register.name,
            validation: ""
        }, {
            field: $scope.register.email,
            validation: ""
        }, {
            field: $scope.register.number,
            validation: ""
   }, {
            field: $scope.register.message,
            validation: ""
   }];
        var check = formvalidation($scope.allvalidation);
        //        if (navigator.network.connection.type == Connection.none) {
        //            var myPopup = $ionicPopup.show({
        //                title: 'No Internet Connection',
        //                scope: $scope,
        //            });
        //            $timeout(function () {
        //                myPopup.close(); //close the popup after 3 seconds for some reason
        //            }, 1500);
        //        } else {
        if (check) {
            $scope.reg = register;
            console.log($scope.reg);
            MyServices.becomeamember($scope.reg, becomeamembercallback);

        } else {
            var myPopup = $ionicPopup.show({
                title: 'Please Enter Mandatory Fields!!',
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);

            //            }
        }
    }

    //become a member end

    var logincallback = function (data, status) {
        if (data == "false") {
            console.log(data);
            console.log("Login Failed");
            $scope.showPopup();
        } else if (data == -1) {
            console.log("already logged in!!");
            $scope.showPopup1();
        } else {
            //			console.log(data);
            data = data.replace('"', "");
            //			console.log(data);
            data = parseInt(data);
            console.log(data);
            user1 = data;
            $.jStorage.set("user1", data);
            user = data;
            $location.url("/app/home");
        }

    };

    $scope.showPopup = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Incorrect Membership Number or Password.</p>',
            title: 'Login Failed',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopup2 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Successfully registered!!</p>',
            title: 'Thankyou',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopup1 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Sorry you are already logged in!!!</p>',
            title: 'Already Logged In',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.onlogin = function (user1) {
        MyServices.login(user1, logincallback);
    };

})

.controller('FaqCtrl', function ($scope, $stateParams) {})

.controller('checkout', function ($scope, $stateParams, $ionicPopup, $timeout, MyServices, $ionicLoading, $ionicModal, $location) {
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });


    };
    //    $scope.showloading();
    $scope.prodid = $stateParams.prodid;
    console.log($scope.prodid);
    $scope.isDisabled = 0;
    $scope.detailid = $.jStorage.get("user1");
    console.log($scope.detailid);
    var getuserdetailscallback = function (data, status) {
        //        $ionicLoading.hide();
        $scope.form = data[0];
        //		console.log($scope.form);
        //buying details
        var buyproductcallback = function (data, status) {
            $ionicLoading.hide();
            if (data == "-2") {
                $scope.isDisabled = 0;
                $scope.showPopuppurchase();
            } else if (data == "-1") {
                $scope.isDisabled = 0;
                $scope.showPopupquantity();
            } else {
                console.log("result: " + data);
                $scope.showPopup5();
                $scope.modal1.hide();
                $location.url("/app/home");
            }
        }
        $scope.buyproduct = function (form) {

            $scope.allvalidation = [{
                field: $scope.form.name,
                validation: ""
        }, {
                field: $scope.form.email,
                validation: ""
        }, {
                field: $scope.form.personalcontact,
                validation: ""
   }, {
                field: $scope.form.billingaddress,
                validation: ""
   }, {
                field: $scope.form.billingcity,
                validation: ""
  }, {
                field: $scope.form.billingpincode,
                validation: ""
  }, {
                field: $scope.form.billingstate,
                validation: ""
  }, {
                field: $scope.form.billingcountry,
                validation: ""
  }, {
                field: $scope.form.quantity,
                validation: ""
  }];

            var check = formvalidation($scope.allvalidation);
            if (check) {
                $scope.showloading();
                $scope.isDisabled = 1;
                $scope.form = form;
                //			console.log($scope.form);
                MyServices.buyproduct($scope.detailid, $scope.prodid, $scope.form, buyproductcallback);

            } else {
                var myPopup = $ionicPopup.show({
                    title: 'Please Enter Mandatory Fields!!',
                    scope: $scope,
                });
                $timeout(function () {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);

                //            }
            }
            //			console.log(form);
            //		MyServices.buyproduct($scope.detailid,$scope.prodid,form,buyproductcallback);
        }
        $scope.showPopuppurchase = function () {

            var myPopup = $ionicPopup.show({
                template: '<p class="text-center">Your Purchase balance is low!!!</p>',
                title: 'Amount Exceeds!!',
                scope: $scope,

            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
        $scope.showPopup5 = function () {

            var myPopup = $ionicPopup.show({
                template: '<p class="text-center">Thanks For Purchase!!!</p>',
                title: 'Your Order is Successfully Placed!!',
                scope: $scope,

            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };
        $scope.showPopupquantity = function () {

            var myPopup = $ionicPopup.show({
                template: '<p class="text-center">Sorry Cannot Proceed!!</p>',
                title: 'Quantity Exceeds',
                scope: $scope,

            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);
        };

        $ionicModal.fromTemplateUrl('templates/modal-form.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal1 = modal;
        });

        $scope.openform = function () {
            $scope.modal1.show();
        };

        $scope.closeform = function () {
            $scope.modal1.hide();
        };
        $scope.diffadd = false;
        $scope.showdiffaddress = function () {
            $scope.diffadd = true;
        }

        $scope.hidediffaddress = function () {
            $scope.diffadd = false;
        }
    }
    MyServices.getuserdetails($scope.detailid, getuserdetailscallback);
})

.controller('SellingCtrl', function ($scope, $stateParams, $ionicPopup, $timeout, MyServices, $ionicLoading) {
    //Loading Package
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

    //SELLING APPROVAL
    var sellingapprovalcallback = function (data, status) {
        $scope.req = data.sellingapproval;
        console.log($scope.req);
        $ionicLoading.hide();
    }
    $scope.sell = $.jStorage.get("user1");
    console.log($scope.sell);
    MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup

    };

    var acceptstatuscallback = function (data, status) {
        console.log(data);
        $ionicLoading.hide();
        MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
        globalfunctionapproval();

    }
    $scope.reason = "";
    $scope.accept = function (r, reason) {
        console.log("amt" + r.amount);
        console.log("pb" + r.purchasebalance);
        console.log(r.id);
        if (parseInt(r.purchasebalance) <= r.amount) {
            console.log("in if");
            $scope.showPopup4();
        } else {
            console.log("in else");
            MyServices.accepted(r.id, reason, 1, acceptstatuscallback);
            $scope.showloading();
        }
    }

    $scope.showPopup4 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">You have insufficient purchase balance!!!</p>',
            title: 'Oops sorry cannot proceed!!!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.decline = function (r, reason) {
        console.log("Decline");
        console.log(r);
        MyServices.accepted(r.id, reason, 2, acceptstatuscallback);
        $scope.showloading();
    }


})

.controller('TransactionCtrl', function ($scope, $stateParams, $ionicPopup, $location, MyServices, $ionicLoading, $timeout) {
    //	
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
    };
    $scope.showloading();
    $scope.totaltr = 0;
    $scope.totalsr = 0;
    var transactioncallback = function (data, status) {
        $ionicLoading.hide();
        $scope.t = data;

        //purchase
        for (var i = 0; i < $scope.t.purchased.length; i++) {
            $scope.totaltr = $scope.totaltr + parseInt($scope.t.purchased[i].amount);
        }
        console.log($scope.totaltr);

        //sales
        for (var j = 0; j < $scope.t.sales.length; j++) {
            $scope.totalsr = $scope.totalsr + parseInt($scope.t.sales[j].amount);
        }
        console.log($scope.totalsr);

        $scope.finalsales = parseInt($scope.t.totalsales.salesbalance) + parseInt($scope.totaltr);
        $scope.finalpurchase = parseInt($scope.t.totalpurchase.purchasebalance) + parseInt($scope.totalsr);

        console.log($scope.finalsales + " " + $scope.finalpurchase);

    }
    $scope.trans = $.jStorage.get("user1");
    MyServices.transaction($scope.trans, transactioncallback);


    //  DECLARATION
    $scope.returnsactive = "active";
    $scope.purchased = "bold";
    //    $scope.user = [];

    //  DESIGN CODE
    $scope.changepurchase = function () {
        $scope.purchased = "bold";
        $scope.sale = "";
        $scope.admin = "";
    }

    $scope.chnagesale = function () {
        $scope.purchased = "";
        $scope.sale = "bold";
        $scope.admin = "";
    }
    $scope.chnageadmin = function () {
        $scope.purchased = "";
        $scope.sale = "";
        $scope.admin = "bold";
    }


    //  GET USER DETAILS
    //    $scope.user = MyServices.getuser();

})

.controller('AboutCtrl', function ($scope, $stateParams) {

})

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, $ionicSlideBoxDelegate, MyServices, $http, $location, $ionicLoading, $cordovaCamera, $cordovaFileTransfer, $cordovaImagePicker) {
    //Loading Package
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

    //Hide when on PC
    //    var options = {
    //        quality: 20,
    //        destinationType: Camera.DestinationType.FILE_URI,
    //        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //        allowEdit: true,
    //        encodingType: Camera.EncodingType.JPEG,
    //        saveToPhotoAlbum: true
    //    };

    var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
    };

    var changeprofilephoto = function (result) {
        console.log(result);
        console.log(result.value);
        $scope.profile.shoplogo = result.value;
    };

    var changeshopphoto = function (result) {
        MyServices.shopphoto($scope.pro, shopphotocallback);
        MyServices.shopproductphoto($scope.pro, shopproductphotocallback);
    };

    $scope.changeprofileimage = function () {
        console.log("take picture");
        //        $cordovaCamera.getPicture(options).then(function (imageData) {
        //            // Success! Image data is here
        //            console.log("here in upload image");
        //            console.log(imageData);
        //            if (imageData.substring(0, 21) == "content://com.android") {
        //                var photo_split = imageData.split("%3A");
        //                imageData = "content://media/external/images/media/" + photo_split[1];
        //            }
        //            $scope.cameraimage = imageData;
        //            $scope.uploadPhoto(adminurl + "imageuploadprofile?user=" + user.id, changeprofilephoto);
        //        }, function (err) {
        //            // An error occured. Show a message to the user
        //        });

        $cordovaImagePicker.getPictures(options).then(function (resultImage) {
            // Success! Image data is here
            console.log("here in upload image");

            console.log(resultImage);

            $scope.cameraimage = resultImage[0];
            console.log(adminurl);
            $scope.uploadPhoto(myserverbase + "imageuploadprofile", changeprofilephoto, resultImage[0]);

        }, function (err) {
            // An error occured. Show a message to the user
        });

    };

    $scope.changeshopimage = function (id) {
        console.log("take picture");

        $cordovaCamera.getPicture(options).then(function (imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "imageuploadshop?id=" + id + "&user=" + user.id, changeshopphoto);
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.changeproductimage = function (id) {
        console.log("take picture");
        console.log("ID " + id);
        $cordovaCamera.getPicture(options).then(function (imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "imageuploadproduct?id=" + id + "&user=" + user.id, changeshopphoto);
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };



    //Upload photo

    //File Upload parameters: source, filePath, options
    $scope.uploadPhoto = function (serverpath, callback, imagepath) {
        
        console.log(imagepath);
        console.log(serverpath);
        $cordovaFileTransfer.upload(serverpath, imagepath, {})
            .then(function (result) {
                console.log(result);
                callback(result);
            }, function (err) {
                console.log(err);
            }, function (progress) {
                console.log("progress");
            });

    };



    // shop profile
    $scope.pro = $.jStorage.get("user1");
    $scope.epro = {};
    var shopphotocallback = function (data, status) {
        $scope.pic = data;
        console.log($scope.pic);
        $ionicLoading.hide();

    }
    var shopproductphotocallback = function (data, status) {
        $scope.image = data;

    }
    var getallcategory1callback = function (data, status) {
        $scope.cat = data;
        console.log($scope.cat);
    }
    var updatecatcallback = function (data, status) {
        console.log(data);
    }
    $scope.updatecat = function (c) {
        $scope.cats = c;
        console.log('Category Id: ' + $scope.cats);
        MyServices.updatecat(user.id, $scope.cats, updatecatcallback);
    }
    var getareacallback = function (data, status) {
        console.log(data);
        $scope.areas = data;
    }
    var updateareacallback = function (data, status) {
        console.log(data);
    }
    $scope.updatearea = function (a) {
        $scope.ar = a;
        console.log('Area Id: ' + $scope.ar);
        MyServices.updatearea(user.id, $scope.ar, updateareacallback);
    }
    var shopprofilecallback = function (data, status) {
            $scope.profile = data;
            MyServices.getallcategory1(getallcategory1callback);
            MyServices.getarea(getareacallback);

        }
        //    $scope.profile.categoryid=$scope.profile.category;
        //		$scope.profile.areaid=$scope.profile.area;
    MyServices.profile($scope.pro, shopprofilecallback);
    MyServices.shopphoto($scope.pro, shopphotocallback);
    MyServices.shopproductphoto($scope.pro, shopproductphotocallback);
    //edit profile

    $scope.editpro = function (profile) {
            $scope.epro = profile;
            console.log($scope.epro);
        }
        //    $scope.sp=$.jStorage.get("sp");
        //	console.log("In profile");
        ////	console.log($scope.sp);
        ////	
    var updateprofilecallback = function (data, status) {
        if (data == "false") {

            console.log("no data");
        } else {
            console.log("Updated");
            //			MyServices.profile($scope.pro, shopprofilecallback);
            $scope.showeditPopup();

            $location.url("/app/profile");
        }
    }
    $scope.profileupdate = function (profile) {
        $scope.updatedata = profile;
        console.log($scope.updatedata);
        $scope.id = $.jStorage.get("user1");
        console.log($scope.id);
        MyServices.updateprofile($scope.id, $scope.updatedata, updateprofilecallback);



    }

    $scope.showeditPopup = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your profile has been updated successfully!</p>',
            title: 'Profile Updated',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $ionicModal.fromTemplateUrl('templates/resetpswd.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal2 = modal;
    });

    $scope.openPassword = function () {
        $scope.oModal2.show();
    };

    $scope.closePassword = function () {
        $scope.oModal2.hide();
    };
    var changepasswordcallback = function (data, status) {
        if (data == "-1") {
            console.log("new and confirm do not match ");
            $scope.showpasswordPopup1();
        } else {
            $scope.p = data;
            console.log($scope.p);
            $scope.showpasswordPopup();
            $scope.pass = {};
            $scope.oModal2.hide();
        }
    }

    $scope.pass = {};

    $scope.changepass = function () {
            //		$scope.passwrd = pass;
            $scope.id = $.jStorage.get("user1");
            //		$scope.passwrd = pass;
            $scope.allvalidation = [{
                field: $scope.pass.oldpassword,
                validation: ""
        }, {
                field: $scope.pass.newpassword,
                validation: ""
   }, {
                field: $scope.pass.confirmpassword,
                validation: ""
   }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                console.log("valid");
                MyServices.changepassword($scope.id, $scope.pass, changepasswordcallback);

            } else {
                console.log("not valid");
                $scope.showPopup8();
            }
        }
        //	$scope.changepass = function (pass) {
        //		$scope.passwrd = pass;
        //		$scope.id = $.jStorage.get("user1");
        //		$scope.passwrd = pass;
        //		MyServices.changepassword($scope.id, $scope.passwrd, changepasswordcallback)
        //	}
    $scope.showPopup8 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Please Enter Mandatory Fields</p>',
            title: "Sorry Cannot Proceed!!",
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.showpasswordPopup1 = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">New Password and Confirm Password do not Match!</p>',
            title: "Sorry Cannot Proceed!!",
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.showpasswordPopup = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your password has updated successfully!</p>',
            title: 'Password Updated',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    //PROfILE IMAGE
    $ionicModal.fromTemplateUrl('templates/image-modal1.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modals = modal;
    });

    $scope.openpswds = function (num) {
        console.log(num);
        $scope.modals.show();
        setTimeout(function () {
            $ionicSlideBoxDelegate.slide(num);
        }, 200);

    };

    $scope.closeModal = function () {
        $scope.modals.hide();
    };

    $ionicModal.fromTemplateUrl('templates/image-shop1.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalss = modal;
    });

    $scope.openshop = function (num) {
        console.log(num);
        $scope.modalss.show();
        setTimeout(function () {
            $ionicSlideBoxDelegate.slide(num);
        }, 200);

    };

    $scope.closeModals = function () {
        $scope.modalss.hide();
    };

})

.controller('YourBalCtrl', function ($scope, $stateParams, $ionicModal, $ionicLoading, $interval, $ionicPopup, $timeout, MyServices) {



    //    //GET USER PROFILE
    //    $scope.pro = $.jStorage.get("user1");
    //    var shopprofilecallback = function (data, status) {
    //        console.log(data);
    //        $scope.profileuser = data;
    //    }
    //    MyServices.profile($scope.pro, shopprofilecallback);
    //
    //
    //    //Loading Package
    //    $scope.showloading = function () {
    //        $ionicLoading.show({
    //            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
    //        });
    //        $timeout(function () {
    //            $ionicLoading.hide();
    //        }, 10000);
    //    };
    //    $scope.showloading();
    //
    //    var yourbalancecallback = function (data, status) {
    //
    //        if (data == "false") {
    //            console.log("no data");
    //        } else {
    //            $ionicLoading.hide();
    //            console.log(data);
    //            $scope.pb = data;
    //        }
    //
    //    }
    //
    //
    //    console.log("Your Balance Exec");
    //    $scope.bal = $.jStorage.get("user1");
    //    console.log($scope.bal);
    //    MyServices.yourbalance($scope.bal, yourbalancecallback);
    //
    //    $scope.dorefresh = function () {
    //        console.log("Do Refresh");
    //        MyServices.yourbalance($scope.bal, yourbalancecallback);
    //        $scope.showloading();
    //        console.log('Refresh Called');
    //        //Stop the ion-refresher from spinning
    //        $scope.$broadcast('scroll.refreshComplete');
    //    };
    //    chintansglobal.changebalance = $scope.dorefresh;
    //
    //    var checkstate = function (data, status) {
    //        console.log(data);
    //        if (data == "1") {
    //            console.log("Facebook Login");
    //            $interval.cancel(stopinterval);
    //            ref.close();
    //        } else {
    //            console.log("Do nothing");
    //        }
    //    };
    //
    //    var callAtInterval = function () {
    //        console.log("hey hey in inerval");
    //        MyServices.checkstatus($scope.orderidd, checkstate);
    //    };
    //
    //
    //    var balanceaddcallback = function (data, status) {
    //        console.log(data);
    //        $scope.orderidd = data;
    //        $scope.succurl = "http://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=" + data
    //        if (data == "false") {
    //            console.log("balance not added");
    //        } else {
    //            console.log("balance added");
    //            // An elaborate, custom popup
    //            var myPopup = $ionicPopup.show({
    //                template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Your Request has been sent.</p>',
    //                title: 'Your Request Sent!',
    //                scope: $scope,
    //
    //            });
    //            $timeout(function () {
    //                myPopup.close(); //close the popup after 3 seconds for some reason
    //            }, 1500);
    //
    //            //JAGRUTI PAYUMONEY
    //            ref = window.open("http://wohlig.co.in/osb/payumoney/paymentgateway.php?orderid=" + data + "&firstname=" + $scope.profileuser.shopname + "&amount=" + $scope.add.amount + "&email=" + $scope.profileuser.shopemail + "&phone=" + $scope.profileuser.shopcontact2 + "&productinfo=xbalance&surl=http://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=" + data + "&furl=wohlig.com", '_blank', 'location=no');
    //
    //            stopinterval = $interval(callAtInterval, 2000);
    //            ref.addEventListener('exit', function (event) {
    //                $interval.cancel(stopinterval);
    //            });
    //
    //        }
    //    };
    //    $scope.addbalance = function (amount, reason) {
    //        $scope.user = $.jStorage.get("user1");
    //        $scope.a = amount;
    //        $scope.b = reason;
    //        $scope.allvalidation = [{
    //            field: $scope.a,
    //            validation: ""
    //        }];
    //        var check = formvalidation($scope.allvalidation);
    //        if (check) {
    //            console.log("valid");
    //            console.log($scope.a, $scope.b);
    //            MyServices.balanceadd($scope.user, $scope.a, balanceaddcallback, $scope.b);
    //
    //        } else {
    //            console.log("not valid");
    //            $scope.showPopup7();
    //        }
    //    }
    //    $scope.showPopup7 = function () {
    //        $scope.data = {}
    //
    //        // An elaborate, custom popup
    //        var myPopup = $ionicPopup.show({
    //            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Its Mandatory</p>',
    //            title: 'Enter Amount!',
    //            scope: $scope,
    //
    //        });
    //        $timeout(function () {
    //            myPopup.close(); //close the popup after 3 seconds for some reason
    //        }, 1500);
    //    };
    //
    //    //	$scope.user = $.jStorage.get("user1");
    //    //	$scope.addbalance = function (amount, reason) {
    //    //		$scope.a = amount;
    //    //		$scope.b = reason;
    //    //		console.log($scope.a, $scope.b);
    //    //		MyServices.balanceadd($scope.user, $scope.a, balanceaddcallback, $scope.b);
    //    //	};
    //    //	$scope.amount = 0;
    //    $scope.amount = 1000;
    //    $scope.percent = parseFloat(user.percentpayment);
    //
    //    $ionicModal.fromTemplateUrl('templates/addbalance.html', {
    //        scope: $scope,
    //        animation: 'slide-in-up'
    //    }).then(function (modal) {
    //        $scope.modal = modal;
    //    });
    //    $scope.add = {
    //        amountinr: 0,
    //        amount: 0,
    //        reason: ""
    //    };
    //
    //    $scope.changeamountinr = function (amount) {
    //        $scope.add.amountinr = amount * $scope.percent / 100;
    //    };
    //    $scope.changeamount = function (amountinr) {
    //        $scope.add.amount = amountinr / $scope.percent * 100;
    //    };
    //
    //    $scope.openedit = function () {
    //        $scope.modal.show();
    //    }
    //
    //    $scope.closeModal = function () {
    //        $scope.modal.hide();
    //    };
    //    //popup
    //    $scope.showPopup = function () {
    //        $scope.data = {}
    //
    //        // An elaborate, custom popup
    //        var myPopup = $ionicPopup.show({
    //            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Your Request has been sent.</p>',
    //            title: 'Your Request Sent!',
    //            scope: $scope,
    //
    //        });
    //        $timeout(function () {
    //            myPopup.close(); //close the popup after 3 seconds for some reason
    //        }, 1500);
    //    };
    //
    //
    //
    //    //PAY U MONEY
    //
    //
    //
    //    $scope.topayment = function () {
    //        ref = window.open("http://wohlig.co.in/osb/payumoney/paymentgateway.php?orderid=909&firstname=jagrytu&amount=98&email=jagruti@wohlig.com&phone=0987654345&productinfo=xbalance&surl=htttp://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=909&furl=wohlig.com", '_blank', 'location=no');
    //
    //        //        stopinterval = $interval(callAtInterval, 10000);
    //    }
    //
    //

})

.controller('MyproductsCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal, $location, MyServices, $cordovaCamera, $timeout, $cordovaFileTransfer, $ionicLoading) {
    //view products start
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
    };
    $scope.showloading();
    var viewmyproductscallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        $scope.products = data;
    }
    $scope.myid = $.jStorage.get("user1");
    MyServices.viewmyproducts($scope.myid, viewmyproductscallback);
    //view products end
    $scope.showPopup6 = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Low Sales Balance!!</p>',
            title: 'Oops product cannot be added!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    //add products start
    $scope.ap = [];
    var createproductcallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        $scope.insertprodid = data;
        if (data == "-1") {
            $scope.showPopup6();
        }
        MyServices.viewmyproducts($scope.myid, viewmyproductscallback);
        $scope.ap = {};
        $scope.modal.hide();
    }
    $scope.prodimg = '';
    //insert product wit validation
    //	$scope.ap="";

    $scope.insertproduct = function (ap) {
            $scope.showloading();
            $scope.allvalidation = [{
                field: $scope.ap.name,
                validation: ""
         }, {
                field: $scope.ap.price,
                validation: ""
         }, {
                field: $scope.ap.quantity,
                validation: ""
         }, {
                field: $scope.ap.category,
                validation: ""
   }, {
                field: $scope.ap.description,
                validation: ""
          }];

            var check = formvalidation($scope.allvalidation);
            if (check) {
                $scope.ap = ap;
                if ($scope.ap.status == true) {
                    $scope.ap.status = 1;
                    console.log($scope.ap.status);
                }
                if ($scope.ap.status == false) {
                    $scope.ap.status = 0;
                    console.log($scope.ap.status);
                }
                console.log($scope.ap);
                console.log("before:" + $scope.prodimg);
                $scope.insertid = $.jStorage.get("user1");
                MyServices.createproduct($scope.insertid, $scope.ap, $scope.prodimg, createproductcallback);
            } else {
                $scope.showPopup10();
            }

        }
        //add products end
        //addproductimage
    $scope.showPopup10 = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Please Enter Mandatory Fields!!</p>',
            title: 'Sorry!!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    var addproductimage = function (result) {
        //        $ionicLoading.hide();
        console.log(result);
        console.log(result.response);
        $scope.xyz = JSON.parse(result.response);
        console.log($scope.xyz);
        $scope.prodimg = $scope.xyz.value;
    }

    $scope.addproductimage = function () {
        //        $scope.showloading();
        console.log("take picture");
        $cordovaCamera.getPicture(options).then(function (imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "addproductimage", addproductimage);
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };
    //product details start
    var getsingleproductcallback = function (data, status) {
        $ionicLoading.hide();
        $scope.prodetails = data;
        console.log($scope.prodetails);
        if ($scope.prodetails.status == 1) {
            //			$scope.prodetails.status = "Available";
            $scope.prodetails.status = true;
        }
        if ($scope.prodetails.status == 0) {
            //			$scope.prodetails.status = "Not Available";
            $scope.prodetails.status = false;
        }
    }
    $scope.productdetails = function (id) {
            $scope.showloading();
            MyServices.getsingleproduct(id, getsingleproductcallback);
        }
        //product details end
        //categories
    var homecallback = function (data, status) {
        console.log(data.category);
        $scope.cat = data.category;
    }
    MyServices.home($scope.insertid, homecallback);
    //edit products and status start
    var editproductcallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        if (data == "0") {
            $scope.showPopup15();
        } else if (data == "1") {
            $scope.showPopup16();
            MyServices.viewmyproducts($scope.myid, viewmyproductscallback);
            $scope.modal2.hide();
        }

    }
    $scope.showPopup15 = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Low Sales Balance</p>',
            title: 'Amount Exceeds!!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopup16 = function () {
        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Product Updated!</p>',
            title: 'Successfull!!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.showloading();
    $scope.editproducts = function (products) {
        $scope.showloading();
        $scope.editpro = products;
        $scope.allvalidation = [{
            field: $scope.editpro.name,
            validation: ""
        }, {
            field: $scope.editpro.price,
            validation: ""
        }, {
            field: $scope.editpro.quantity,
            validation: ""
        }, {
            field: $scope.editpro.category,
            validation: ""
        }, {
            field: $scope.editpro.description,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            console.log($scope.editpro);
            if ($scope.editpro.status == true) {
                $scope.editpro.status = 1;
            }
            if ($scope.editpro.status == false) {
                $scope.editpro.status = 0;
            }
            console.log("in edit product:" + $scope.prodetails.image);
            MyServices.editproduct($scope.editpro, $scope.insertid, $scope.prodetails.image, editproductcallback);

        } else {
            $scope.showPopupenteredit();
        }

    }
    $scope.showPopupenteredit = function () {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Please Enter Mandatory Fields!</p>',
            title: 'Sorry Cannot Proceed!',
            scope: $scope,

        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    var changeproductstatuscallback = function (data, status) {
        console.log("change status:" + data);
    }
    $scope.editstatus = function (id, status) {
        console.log(id);
        if (status == true) {
            status = 1;
        }
        if (status == false) {
            status = 0;
        }
        console.log(status);
        MyServices.changeproductstatus(id, status, changeproductstatuscallback);
    }
    var deleteproductcallback = function (data, status) {
        $ionicLoading.hide();
        console.log(data);
        $scope.modal2.hide();
        MyServices.viewmyproducts($scope.myid, viewmyproductscallback);
    }
    $scope.deleteproduct = function (prodid, user) {
            $scope.showloading();
            MyServices.deleteproduct(prodid, user, deleteproductcallback);
        }
        //edit products and status end
        //Hide when on PC
    var options = {
        quality: 20,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        saveToPhotoAlbum: true
    };


    //upload editproductimage start
    var editproductimage = function (result) {
        $ionicLoading.hide();
        console.log(result.response);
        $scope.abc = JSON.parse(result.response);
        $scope.prodetails.image = $scope.abc.value;
        console.log("in edit image success:" + $scope.prodetails.image);
        //		console.log(result.response);
        //		$scope.xyz = JSON.parse(result.response);
        //		console.log($scope.xyz);
        //		$scope.prodimg = $scope.xyz.value;
    }
    $scope.editproductimage = function () {
        $scope.showloading();
        //		console.log(id);
        console.log("take picture");
        $cordovaCamera.getPicture(options).then(function (imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "editproductimage", editproductimage);
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };
    //upload editproductimage end

    //Upload photo

    //File Upload parameters: source, filePath, options
    $scope.uploadPhoto = function (serverpath, callback) {

        //        console.log("function called");
        $cordovaFileTransfer.upload(serverpath, $scope.cameraimage, options)
            .then(function (result) {
                console.log(result);
                callback(result);
                $ionicLoading.hide();
                //$scope.addretailer.store_image = $scope.filename2;
            }, function (err) {
                // Error
                console.log(err);
            }, function (progress) {
                // constant progress updates
                $ionicLoading.show({
                    //        template: 'We are fetching the best rates for you.',

                    content: 'Uploading Image',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: '0'
                });
                console.log("progress");
            });

    };
    $ionicModal.fromTemplateUrl('templates/addproducts.html', {
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

    $ionicModal.fromTemplateUrl('templates/productdetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

    $scope.openprdtdetails = function () {
        $scope.modal1.show();
    };

    $scope.closeprdtdetails = function () {
        $scope.modal1.hide();
    };

    $ionicModal.fromTemplateUrl('templates/productedit.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    $scope.openprdtedit = function () {
        $scope.modal2.show();
    };

    $scope.closeprdtedit = function () {
        $scope.modal2.hide();
    };

})

.controller('OrderCtrl', function ($scope, $stateParams, $ionicPopup, $ionicModal, $location, MyServices, $ionicLoading, $timeout) {
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
    };
    $scope.showloading();
    $scope.tabvalue = 1;
    var viewmyproductorderscallback = function (data, status) {
        $ionicLoading.hide();
        $scope.ordr = data.queryresult;
        console.log($scope.ordr);
    }
    $scope.uid = $.jStorage.get("user1");
    MyServices.viewmyproductorders($scope.uid, viewmyproductorderscallback);
    var viewallorderscallback = function (data, status) {
        console.log(data.queryresult);
        $scope.mypurchase = data.queryresult;
    }
    MyServices.viewallorders($scope.uid, viewallorderscallback);


    $ionicModal.fromTemplateUrl('templates/modal-mypurchase.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openpurchase = function (p) {
        $scope.getp = p;
        $scope.modal.show();
    };

    $scope.closepurchase = function () {
        $scope.modal.hide();
    };


    $ionicModal.fromTemplateUrl('templates/modal-mysale.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

    $scope.opensale = function (o) {
        $scope.getsell = o;
        $scope.modal1.show();
    };

    $scope.closesale = function () {
        $scope.modal1.hide();
    };

})

.controller('DealerprdCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading) {
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
    };
    $scope.showloading();
    var getalluserproductscallback = function (data, status) {
        $ionicLoading.hide();
        $scope.break = data.queryresult;
        $scope.shopname = $scope.break[0].shopname;
        $scope.break = partitionarray($scope.break, 3);
        console.log($scope.break);

    }
    $scope.getprod = $stateParams.id;
    MyServices.getalluserproducts($scope.getprod, getalluserproductscallback);
})


.controller('NotificationCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading) {
    $scope.showloading = function () {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function () {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();
    var getnotificationcallback = function (data, status) {
        $scope.notification = data;
        console.log($scope.notification);
    }

    $scope.notificationid = $.jStorage.get("user1");
    MyServices.getnotification($scope.notificationid, getnotificationcallback);

})


.controller('ProductdetailCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading) {
        //all products
        $scope.showloading = function () {
            $ionicLoading.show({
                template: '<ion-spinner class="spinner-royal"></ion-spinner>'
            });
        };
        $scope.showloading();
        $scope.disableid = $.jStorage.get("user1");
        var getalluserproductscallback = function (data, status) {
            $ionicLoading.hide();
            //			console.log(data.queryresult);
            $location.url("/app/dealerprd/" + $scope.getsinglepro.user);

        }
        $scope.getallprod = function (id) {
            $scope.showloading();
            MyServices.getalluserproducts(id, getalluserproductscallback);
        }



        $scope.prodid = $stateParams.id;
        console.log($scope.prodid);
        var getsingleproductcallback = function (data, status) {
            $ionicLoading.hide();
            $scope.getsinglepro = data;
            console.log($scope.getsinglepro);

        }
        MyServices.getsingleproduct($scope.prodid, getsingleproductcallback);
        $scope.openform1 = function (productid) {
            $location.url("/app/checkout/" + productid);
        }

    })
    .controller('EventCtrl', function ($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading) {});