angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout,MyServices,$location) {



//your balance
var yourbalancecallback=function(data,status){

	if(data=="false")
        {
           
            console.log("no data");
        }
        else
        {
           console.log(data);
			$scope.pb=data;
//            $location.url("/app/selling");
        }
}
$scope.yourbalance=function(){
	$scope.bal=$.jStorage.get("user1");
	console.log($scope.bal);
MyServices.yourbalance($scope.bal,yourbalancecallback);
}
//log out
var logoutcallback=function(){
console.log("you have logged out");
}
$scope.out=function(){
MyServices.logout(logoutcallback);
	$location.url("/login");
}

})

.controller('HomeCtrl', function ($scope, MyServices, $ionicModal,$location) {
	//home page
		var homecallback=function(data,status){
		$scope.user=data;
		console.log($scope.user);
//		$location.url("/app/search");
	};
	$scope.user=$.jStorage.get("user1");
        MyServices.home($scope.user,homecallback);
	
	
	//search shop
	
	 $scope.memfunc = function(home) {
		 console.log(home);
		 $location.url("/app/search/"+home.area+"/"+home.category+"/"+home.membershipno);
		
	 }
	
	
    
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
	$scope.d={};
	
	
	
		//shop search through membershipno
//	var shopprofilecallback=function(data,status){
//		$scope.ps=data;
//		console.log($scope.ps);
//		$location.url("/app/shop");
//	};
//	 $scope.memclick=function(d){
//		 $scope.content=d.searchresult[0].id;
//		MyServices.profile($scope.content,shopprofilecallback);
//       $location.url("/app/shop");
//
//	};
//	
//		var shopprofilecallback=function(data,status){
//		$scope.sp=data;
//		console.log($scope.sp);
//		$location.url("/app/shop");
//	};
//    $scope.shopclick=function(r){
//		$scope.rs=r;
//		console.log($scope.rs.searchresult[0].id);
//		
//	MyServices.profile($scope.rs.searchresult[0].id,shopprofilecallback);
////		$location.url("/app/shop");
//	};
//	$scope.user={};
//	var homecallback=function(data,status){
//		$scope.user=data;
//		console.log($scope.user);
////		$location.url("/app/search");
//	};
//	
//	$scope.homecall=function() {
//		$scope.user=$.jStorage.get("user1");
//		console.log($scope.user);
////        MyServices.home(user1,homecallback);
//    };
	
//	$scope.user2={
//	area:'5',
//	category:'3's
//	};
	
//	$scope.demo={};
//	$scope.setname = function(name){
//		$.jStorage.set
//		console.log(name);
//	}
//
	 	
	
////		 console.log()
//////		 MyServices.setsearch(home);
////		 console.log("area="+home.area+"category="+home.category+"membershipno="+home.membershipno);
////		 $location.url("/app/search");
////		 MyServices.searchresult(home,searchcallback); 
//    };
//	//	//shop select from membershipno
//	var memcallback=function(data,status){
//	if(data=="false")
//        {
//           
//            console.log("no data");
//        }
//        else
//        {
//           
//			$scope.r=data;
//			console.log($scope.r);
//        }
//	}
//	
//	$scope.mid=function(m){
////		console.log(m.membershipno);
//		MyServices.mem(m.membershipno,memcallback);
//	}
})

.controller('SearchCtrl', function ($scope, MyServices, $ionicModal,$location,$stateParams) {
//shop search through area and category
	console.log($stateParams);
	var searchcallback=function(data,status){
	$scope.shops=data;
		console.log($scope.shops);
	
	}
	 MyServices.searchresult($stateParams.area,$stateParams.category,$stateParams.membershipno,searchcallback);
	var getareacategorycallback=function(data,status){
	$scope.recall=data;
		console.log($scope.recall);
	}
	 MyServices.getareacategory($stateParams.area,$stateParams.category,getareacategorycallback);
	
	
	
	$scope.demo = [];
//	$scope.area = JSON.parse($.jStorage.get("search").area);
//	$scope.category = JSON.parse($.jStorage.get("search").category);
	var searchcallback=function(data,status){
		console.log(data);
		$scope.demo=data;
		$.jStorage.set("demo",data);
	};
	
//	MyServices.searchresult(searchcallback);
	
//var shopprofilecallback=function(data,status){
//		$scope.sp=data;
//		console.log($scope.sp);
////		$location.url("/app/search");
//	};
//    $scope.shopclick=function(shop){
//		console.log(shop.id);
//	MyServices.profile(shop.id,shopprofilecallback);
//		$location.url("/app/shop");
//	};  
})

.controller('ShopCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout,MyServices,$stateParams) {
	var shopprofilecallback=function(data,status){
	$scope.profile=data;
		console.log($scope.profile);
	}
	shopid=$stateParams.id;
	console.log(shopid);
	MyServices.profile(shopid,shopprofilecallback);
	var shopphotocallback=function(data,status){
	$scope.shoppic=data;
		console.log($scope.shoppic);
		for (var i = 0; i < $scope.shoppic.length; i++) {
            $scope.shoppic[i].photo = imgpath + $scope.shoppic[i].photo;
        }
		console.log($scope.shoppic);
	}
	var shopproductphotocallback=function(data,status){
	$scope.img=data;
		for (var i = 0; i < $scope.img.length; i++) {
            $scope.img[i].photo = imgpath + $scope.img[i].photo;
        }
		console.log($scope.img);
	}
	MyServices.shopphoto(shopid,shopphotocallback);
	MyServices.shopproductphoto(shopid,shopproductphotocallback);
	
	
	$scope.callpurchase=function(profile){
		$scope.modal.show();
	};
	
	var purchaserequestcallback=function(data,status){
		
		if(data=="false")
        {
           
            console.log("balance not added");
        }
        else
        {
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
	
	$scope.sendamt=function(amount){
	
		$scope.amt=amount;
		console.log($scope.amt);
		$scope.userfrom=$.jStorage.get("user1");
//		console.log($scope.pid.shopprofile[0].id);
		MyServices.purchaserequest($scope.userfrom,shopid,amount,purchaserequestcallback);
//		 //popup
//    $scope.showPopup = function () {
//        $scope.data = {}
//       //  An elaborate, custom popup
//        var myPopup = $ionicPopup.show({
//            template: '<div class="text-center">
//			<h2 class="ion-checkmark-round balanced round-circle">
//			</h2><p>Please Wait for the Approval!</p>',
//            title: 'Your Request Sent!',
//            scope: $scope,
//        });
//        $timeout(function () {
//            myPopup.close(); //close the popup after 3 seconds for some reason
//        }, 1500);
//    };
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

   
})


.controller('LoginCtrl', function ($scope, $stateParams,MyServices,$location) {
  $.jStorage.flush();
    
    var logincallback=function(data,status) {
        if(data=="false")
        {
            console.log(data);
            console.log("Login Failed");
        }
        else
        {
//			console.log(data);
			data=data.replace('"',"");
//			console.log(data);
			data=parseInt(data);
			console.log(data);
            user1=data;
            $.jStorage.set("user1",data);
            $location.url("/app/home");
        }
            
    };
    
    $scope.onlogin=function(user1) {
        MyServices.login(user1,logincallback);
    };
})

.controller('FaqCtrl', function ($scope, $stateParams) {})

.controller('SellingCtrl', function ($scope, $stateParams, $ionicPopup, $timeout,MyServices) {
	
		//SELLING APPROVAL
	
	var sellingapprovalcallback=function(data,status){
	$scope.req=data.sellingapproval;
	console.log($scope.req);
	}
	$scope.sell=$.jStorage.get("user1");
		console.log($scope.sell);
	MyServices.sellingapproval($scope.sell,sellingapprovalcallback);
    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
       
    };
    $scope.showPopups = function () {
        $scope.data = {}

        // An elaborate, custom popup

    };
	var myPopup = '';
	var acceptedcallback=function(data,status){
	if(data=="false")
        {
           
            console.log("Not accepted");
        }
        else
        {
           console.log("accepted");
           console.log(data);
			$scope.insertid=data;
			console.log($scope.insertid);
			myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><input type="text" ng-model="accept.text"><button class="button button-small button-outline button-balanced" ng-click="acceptApp(accept.text);">Accept</button><p>Accepted!</p>',
            title: 'Accept',
            scope: $scope,

        });
//        $timeout(function () {
//            myPopup.close(); //close the popup after 3 seconds for some reason
//        }, 5000);
        }
}
	
	var acceptreasoncallback=function(data,status){
	if(data=="false")
        {
           
            console.log("Reason not accepted");
        }
        else
        {
           console.log("reason accepted")
	
	}
	}
	$scope.acceptApp = function (text){
		console.log(text);
		MyServices.acceptreason($scope.insertid,text,acceptreasoncallback);
		 myPopup.close();
	}
	var acceptstatuscallback=function(data,status){
	console.log(data);
	}
$scope.accept=function(r){
    $scope.sd=r;
//	console.log($scope.sd.amount);
	$scope.userfrom=$.jStorage.get("user1");
//	console.log($scope.userfrom);
	
MyServices.accepted($scope.userfrom,$scope.sd.id,$scope.sd.amount,acceptedcallback);
MyServices.acceptstatus($scope.sd.id,acceptstatuscallback);
}
//
	var declinecallback=function(data,status){
	if(data=="false")
        {
           
            console.log("Not decline");
        }
        else
        {
           console.log("declined");
//           console.log(data);
			$scope.declineid=data;
			console.log($scope.declineid);
			myPopups = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-close-round balanced round-circle rounds-x"></h2><input type="text" ng-model="decline.text"><button class="button button-small button-outline button-balanced" ng-click="declineApp(decline.text);">Decline</button><p>Decline!</p>',
            title: 'Decline!',
            scope: $scope,

        });
//        $timeout(function () {
//            myPopups.close(); //close the popup after 3 seconds for some reason
//        }, 2000);
        }
	}
	$scope.decline=function(r){
	$scope.dec=r;
	MyServices.decline($scope.dec.id,declinecallback);
	};
	
// decline reason

var declinereasoncallback=function(data,status){
		if(data=="false")
        {
           
            console.log("No reason");
        }
        else
        {
           console.log("got the reason");
			console.log(data);
		}
		}
		$scope.declineApp=function(text){
		console.log(text);
		MyServices.declinereason($scope.declineid,text,declinereasoncallback);
		}

})

.controller('TransactionCtrl', function ($scope, $stateParams, $ionicPopup, $location,MyServices) {
//	
	var transactioncallback=function(data,status){
	$scope.t=data;
		console.log($scope.t);
	}
	$scope.trans=$.jStorage.get("user1");
	MyServices.transaction($scope.trans,transactioncallback);
	
	
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

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate,MyServices,$http) {
// shop profile
	$scope.pro=$.jStorage.get("user1");
	$scope.epro={};
	var shopphotocallback=function(data,status){
		$scope.pic=data;
		console.log($scope.pic);
		for (var i = 0; i < $scope.pic.length; i++) {
            $scope.pic[i].photo = imgpath + $scope.pic[i].photo;
        }
		console.log($scope.pic);
	}
	var shopproductphotocallback=function(data,status){
	$scope.image=data;
		for (var i = 0; i < $scope.image.length; i++) {
            $scope.image[i].photo = imgpath + $scope.image[i].photo;
        }
		console.log($scope.image);
	}
	var shopprofilecallback=function(data,status){
		
		$scope.profile=data.shopprofile[0];
	}
//	console.log("Pro="+$scope.pro);
	MyServices.profile($scope.pro,shopprofilecallback);
	MyServices.shopphoto($scope.pro,shopphotocallback);	
	MyServices.shopproductphoto($scope.pro,shopproductphotocallback);	
	//edit profile
	$scope.editpro=function(profile){
		$scope.epro=profile;
		console.log($scope.epro);
	}
//    $scope.sp=$.jStorage.get("sp");
//	console.log("In profile");
////	console.log($scope.sp);
////	
	var updateprofilecallback=function(data,status){
	if(data=="false")
        {
           
            console.log("no data");
        }
        else
        {
           console.log("Updated");
        }
	}
	$scope.profileupdate=function(profile){
	$scope.updatedata=profile;
		console.log($scope.updatedata);
		$scope.id=$.jStorage.get("user1");
		console.log($scope.id);
		MyServices.updateprofile($scope.id,$scope.updatedata,updateprofilecallback);
		
	}
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
var changepasswordcallback=function(data,status){
	$scope.p=data;
console.log($scope.p);
	 $scope.oModal2.hide();
}
	$scope.changepass=function(pass){
		$scope.passwrd=pass;
		$scope.id=$.jStorage.get("user1");
	$scope.passwrd=pass;
		MyServices.changepassword($scope.id,$scope.passwrd,changepasswordcallback)
	}
})

.controller('YourBalCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout,MyServices) {
	var balanceaddcallback=function(data,status){
	if(data=="false")
        {
           
            console.log("balance not added");
        }
        else
        {
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
//            $location.url("/app/home");
        }
	};
	$scope.user=$.jStorage.get("user1");
	$scope.addbalance=function(amount){
	$scope.a=amount;
		console.log($scope.a);
		 MyServices.balanceadd($scope.user,$scope.a,balanceaddcallback);
	};
//	$scope.amount = 0;
	
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