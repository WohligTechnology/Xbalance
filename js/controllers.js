var globalfunctionapproval = {};
var ref = 0;

angular.module('starter.controllers', ['myservices', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MyServices, $location, $ionicLoading, $ionicPopup) {
    //Loading Package
    $scope.showloading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();
    //log out
    var logoutcallback = function(data, status) {
        console.log("logged out");
    }
    $scope.logoutfunction = function() {
        $scope.loginid = $.jStorage.get("user1");
        console.log($scope.loginid);
        MyServices.logout($scope.loginid, logoutcallback);
    }

    //your balance
    $scope.approvalcount = 0;
    var sellingapprovalcallback = function(data, status) {
        $ionicLoading.hide();
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
		$scope.varonline =0;
		$scope.varoffline =0;
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
            template: '<p class="text-center">No such membership number exists.</p>',
            title: 'No Match Found!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $scope.showPopupNoBalance = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your purchase balance is too low.</p>',
            title: 'Low Purchase Balance',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    //search shop
	$scope.onlineclass = "";
	$scope.offlineclass = "";
	$scope.online = function(){
		if($scope.varonline == 0){
			$scope.varonline = 1;
			$scope.onlineclass = "button-activates";
		}else{
			$scope.varonline = 0;
			$scope.onlineclass = "";
		}
		console.log($scope.varonline);
	}
	$scope.offline = function(){
		if($scope.varoffline == 0){
			$scope.varoffline = 1;
			$scope.offlineclass = "button-activates";
		}else{
			$scope.varoffline = 0;
			$scope.offlineclass = "";
		}
		console.log($scope.varoffline);
	}

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
                $location.url("/app/search/" + home.area + "/" + home.category + "/" + $scope.varonline + "/" + $scope.varoffline );
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

.controller('SearchCtrl', function($scope, MyServices, $ionicModal, $timeout, $location, $stateParams, $ionicLoading) {
    //Loading Package
    $scope.showloading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();


    var searchcallback = function(data, status) {
        $scope.shops = data;

    }
    MyServices.searchresult($stateParams.area, $stateParams.category, $stateParams.online,$stateParams.offline,searchcallback);
    var getareacategorycallback = function(data, status) {
        $scope.recall = data;
        $ionicLoading.hide();
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

.controller('ShopCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, MyServices, $stateParams, $ionicLoading) {

    //Loading Package
    $scope.showloading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function() {
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
        $ionicLoading.hide();
    }
    $scope.amount = 1000;
    var shopproductphotocallback = function(data, status) {
        $scope.img = data;

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

.controller('LoginCtrl', function($scope, $stateParams, MyServices, $location, $ionicPopup, $timeout, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/registration.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

    $scope.openreg = function() {
        $scope.oModal1.show();
    };

    $scope.closereg = function() {
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
	var becomeamembercallback=function(data,status){
	console.log(data);
		if(data=="0"){
		console.log("No data found");
		}
		else{
	  $scope.showPopup2();
		console.log("successfull registration");
			$scope.register = [];
			$scope.oModal1.hide();
		}
	}
	$scope.register = [];
	$scope.registerval=function(register){
		
		  $scope.allvalidation = [{
            field: $scope.register.name,
           validation: ""
        }, {
            field: $scope.register.email,
           validation: ""
        },{
			  field: $scope.register.number,
            validation: ""
			},{
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
			$scope.reg=register;
		console.log($scope.reg);
           MyServices.becomeamember($scope.reg, becomeamembercallback);

        } else {
            var myPopup = $ionicPopup.show({
                title: 'Please Enter Mandatory Fields!!',
                scope: $scope,
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);

            //            }
        }
	}
	
	//become a member end
	
    var logincallback = function(data, status) {
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

	$scope.showPopup2 = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Successfully registered!!</p>',
            title: 'Thankyou',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
	
    $scope.showPopup1 = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Sorry you are already logged in!!!</p>',
            title: 'Already Logged In',
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
    .controller('checkout', function($scope, $stateParams) {})

.controller('SellingCtrl', function($scope, $stateParams, $ionicPopup, $timeout, MyServices, $ionicLoading) {
    //Loading Package
    $scope.showloading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

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
        $ionicLoading.hide();
        MyServices.sellingapproval($scope.sell, sellingapprovalcallback);
        globalfunctionapproval();

    }
    $scope.reason = "";
    $scope.accept = function(r, reason) {
        console.log(r);
		if(r.purchasebalance<=r.amount){
			console.log("in if");
		 $scope.showPopup4();
		}
		else{
			console.log("in else");
        MyServices.accepted(r.id, reason, 1, acceptstatuscallback);
        $scope.showloading();
		}
    }
	
	 $scope.showPopup4 = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">You have insufficient purchase balance!!!</p>',
            title: 'Oops sorry cannot proceed!!!',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
    $scope.decline = function(r, reason) {
        console.log("Decline");
        console.log(r);
        MyServices.accepted(r.id, reason, 2, acceptstatuscallback);
        $scope.showloading();
    }


})

    .controller('TransactionCtrl', function($scope, $stateParams, $ionicPopup, $location, MyServices) {
    //	
    $scope.totaltr = 0;
    $scope.totalsr = 0;
    var transactioncallback = function(data, status) {
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

        $scope.finalpurchase = parseInt($scope.t.totalsales.salesbalance) + parseInt($scope.totaltr);
        $scope.finalsales = parseInt($scope.t.totalpurchase.purchasebalance) + parseInt($scope.totalsr);

        console.log($scope.finalsales + " " + $scope.finalpurchase);

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

.controller('ProfileCtrl', function($scope, $stateParams, $ionicModal, $ionicPopup, $timeout, $ionicSlideBoxDelegate, MyServices, $http, $location, $ionicLoading, $cordovaCamera, $cordovaFileTransfer) {
    //Loading Package
    $scope.showloading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

    //Hide when on PC
    //    var options = {
    //        quality: 20,
    //        destinationType: Camera.DestinationType.FILE_URI,
    //        sourceType: Camera.PictureSourceType.CAMERA,
    //        allowEdit: true,
    //        encodingType: Camera.EncodingType.JPEG,
    //        saveToPhotoAlbum: true
    //    };

    var changeprofilephoto = function(result) {
        $scope.profile.shoplogo = result.value;
    };

    var changeshopphoto = function(result) {
        MyServices.shopphoto($scope.pro, shopphotocallback);
        MyServices.shopproductphoto($scope.pro, shopproductphotocallback);
    };

    $scope.changeprofileimage = function() {
        console.log("take picture");

        $cordovaCamera.getPicture(options).then(function(imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "imageuploadprofile?user=" + user.id, changeprofilephoto);
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.changeshopimage = function(id) {
        console.log("take picture");

        $cordovaCamera.getPicture(options).then(function(imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "imageuploadshop?id=" + id + "&user=" + user.id, changeshopphoto);
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.changeproductimage = function(id) {
        console.log("take picture");
        console.log("ID " + id);
        $cordovaCamera.getPicture(options).then(function(imageData) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(imageData);
            if (imageData.substring(0, 21) == "content://com.android") {
                var photo_split = imageData.split("%3A");
                imageData = "content://media/external/images/media/" + photo_split[1];
            }
            $scope.cameraimage = imageData;
            $scope.uploadPhoto(adminurl + "imageuploadproduct?id=" + id + "&user=" + user.id, changeshopphoto);
        }, function(err) {
            // An error occured. Show a message to the user
        });
    };



    //Upload photo

    //File Upload parameters: source, filePath, options
    $scope.uploadPhoto = function(serverpath, callback) {

        //        console.log("function called");
        $cordovaFileTransfer.upload(serverpath, $scope.cameraimage, options)
            .then(function(result) {
                console.log(result);
                callback(result);
                $ionicLoading.hide();
                //$scope.addretailer.store_image = $scope.filename2;
            }, function(err) {
                // Error
                console.log(err);
            }, function(progress) {
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


    // shop profile
    $scope.pro = $.jStorage.get("user1");
    $scope.epro = {};
    var shopphotocallback = function(data, status) {
        $scope.pic = data;
        console.log($scope.pic);
        $ionicLoading.hide();

    }
    var shopproductphotocallback = function(data, status) {
        $scope.image = data;

    }
    var getallcategory1callback = function(data, status) {
        $scope.cat = data;
        console.log($scope.cat);
    }
    var updatecatcallback = function(data, status) {
        console.log(data);
    }
    $scope.updatecat = function(c) {
        $scope.cats = c;
        console.log('Category Id: ' + $scope.cats);
        MyServices.updatecat(user.id, $scope.cats, updatecatcallback);
    }
    var getareacallback = function(data, status) {
        console.log(data);
        $scope.areas = data;
    }
    var updateareacallback = function(data, status) {
        console.log(data);
    }
    $scope.updatearea = function(a) {
        $scope.ar = a;
        console.log('Area Id: ' + $scope.ar);
        MyServices.updatearea(user.id, $scope.ar, updateareacallback);
    }
    var shopprofilecallback = function(data, status) {
        $scope.profile = data;
        console.log($scope.profile);
        MyServices.getallcategory1(getallcategory1callback);
        MyServices.getarea(getareacallback);

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
            $scope.showeditPopup();
        }
    }
    $scope.profileupdate = function(profile) {
        $scope.updatedata = profile;
        console.log($scope.updatedata);
        $scope.id = $.jStorage.get("user1");
        console.log($scope.id);
        MyServices.updateprofile($scope.id, $scope.updatedata, updateprofilecallback);

        $location.url("/app/profile");

    }

    $scope.showeditPopup = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your profile has been updated successfully!</p>',
            title: 'Profile Updated',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };
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
        $scope.showpasswordPopup();
        $scope.oModal2.hide();
    }
    $scope.changepass = function(pass) {
        $scope.passwrd = pass;
        $scope.id = $.jStorage.get("user1");
        $scope.passwrd = pass;
        MyServices.changepassword($scope.id, $scope.passwrd, changepasswordcallback)
    }

    $scope.showpasswordPopup = function() {

        var myPopup = $ionicPopup.show({
            template: '<p class="text-center">Your password has updated successfully!</p>',
            title: 'Password Updated',
            scope: $scope,

        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    };

    $ionicModal.fromTemplateUrl('templates/image-modal1.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modals = modal;
    });

    $scope.openpswds = function() {
        $scope.modals.show();
    };

    $scope.closeModal = function() {
        $scope.modals.hide();
    };

    $ionicModal.fromTemplateUrl('templates/image-shop1.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modalss = modal;
    });

    $scope.openshop = function() {
        $scope.modalss.show();
    };

    $scope.closeModals = function() {
        $scope.modalss.hide();
    };

})

.controller('YourBalCtrl', function($scope, $stateParams, $ionicModal, $ionicLoading, $interval, $ionicPopup, $timeout, MyServices) {



    //GET USER PROFILE
    $scope.pro = $.jStorage.get("user1");
    var shopprofilecallback = function(data, status) {
        console.log(data);
        $scope.profileuser = data;
    }
    MyServices.profile($scope.pro, shopprofilecallback);


    //Loading Package
    $scope.showloading = function() {
        $ionicLoading.show({
            template: '<ion-spinner class="spinner-royal"></ion-spinner>'
        });
        $timeout(function() {
            $ionicLoading.hide();
        }, 10000);
    };
    $scope.showloading();

    var yourbalancecallback = function(data, status) {

        if (data == "false") {
            console.log("no data");
        } else {
            $ionicLoading.hide();
            console.log(data);
            $scope.pb = data;
            //            $location.url("/app/selling");
        }
    }
    console.log("Your Balance Exec");
    $scope.bal = $.jStorage.get("user1");
    console.log($scope.bal);
    MyServices.yourbalance($scope.bal, yourbalancecallback);

    $scope.dorefresh = function() {
        MyServices.yourbalance($scope.bal, yourbalancecallback);
        $scope.showloading();
        console.log('Refresh Called');

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
    };

    var checkstate = function(data, status) {
        console.log(data);
        if (data == "1") {
            console.log("Facebook Login");
            $interval.cancel(stopinterval);
            ref.close();
        } else {
            console.log("Do nothing");
        }
    };

    var callAtInterval = function() {
        console.log("hey hey in inerval");
        MyServices.checkstatus($scope.orderidd, checkstate);
    };


    var balanceaddcallback = function(data, status) {
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
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);

            //JAGRUTI PAYUMONEY
            ref = window.open("http://wohlig.co.in/osb/payumoney/paymentgateway.php?orderid=" + data + "&firstname=" + $scope.profileuser.shopname + "&amount=" + $scope.add.amount + "&email=" + $scope.profileuser.shopemail + "&phone=" + $scope.profileuser.shopcontact2 + "&productinfo=xbalance&surl=http://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=" + data + "&furl=wohlig.com", '_blank', 'location=no');

            stopinterval = $interval(callAtInterval, 2000);
            ref.addEventListener('exit', function(event) {
                $interval.cancel(stopinterval);
            });

        }
    };
    $scope.user = $.jStorage.get("user1");
    $scope.addbalance = function(amount, reason) {
        $scope.a = amount;
        $scope.b = reason;
        console.log($scope.a, $scope.b);
        MyServices.balanceadd($scope.user, $scope.a, balanceaddcallback, $scope.b);
    };
    //	$scope.amount = 0;
    $scope.amount = 1000;
    $scope.percent = parseFloat(user.percentpayment);

    $ionicModal.fromTemplateUrl('templates/addbalance.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $scope.add = {
        amountinr: 0,
        amount: 0,
        reason: ""
    };

    $scope.changeamountinr = function(amount) {
        $scope.add.amountinr = amount * $scope.percent / 100;
    };
    $scope.changeamount = function(amountinr) {
        $scope.add.amount = amountinr / $scope.percent * 100;
    };

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



    //PAY U MONEY



    $scope.topayment = function() {
        ref = window.open("http://wohlig.co.in/osb/payumoney/paymentgateway.php?orderid=909&firstname=jagrytu&amount=98&email=jagruti@wohlig.com&phone=0987654345&productinfo=xbalance&surl=htttp://wohlig.co.in/osb/index.php/json/payumoneysuccess?orderid=909&furl=wohlig.com", '_blank', 'location=no');

        //        stopinterval = $interval(callAtInterval, 10000);
    }



})
.controller('MyproductsCtrl', function($scope, $stateParams, $ionicPopup,$ionicModal, $location, MyServices) {
	var viewmyproductscallback=function(data,status){
	console.log(data);
		$scope.products=data;
	}
	$scope.myid=$.jStorage.get("user1");
	 MyServices.viewmyproducts($scope.myid, viewmyproductscallback);
        $ionicModal.fromTemplateUrl('templates/addproducts.html', {
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
    
    $ionicModal.fromTemplateUrl('templates/productdetails.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal1 = modal;
    });

    $scope.openprdtdetails = function() {
        $scope.modal1.show();
    };

    $scope.closeprdtdetails = function() {
        $scope.modal1.hide();
    };

})

.controller('OrderCtrl', function($scope, $stateParams, $ionicPopup,$ionicModal, $location, MyServices) {
});