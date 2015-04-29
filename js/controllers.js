angular.module('starter.controllers', ['myservices'])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout,MyServices,$location) {
	//selling approval
	var sellingapprovalcallback=function(data,status){
	if(data=="false")
        {
           
            console.log("no data");
        }
        else
        {
           console.log(data);
          $scope.sell=data;
			$.jStorage.set("s",$scope.sell);
            $location.url("/app/selling");
        }
	
	}
	$scope.user=$.jStorage.get("user1");
$scope.sell=function(){
	
MyServices.sellingapproval($scope.user,sellingapprovalcallback);}


//your balance
var yourbalancecallback=function(){
//$scope.bal=$.jStorage.get("demo");
//	console.log($scope.bal);
}
$scope.yourbalance=function(){
	$scope.bal=$.jStorage.get("user1");
	console.log($scope.bal);
//MyServices.yourbalance(,yourbalancecallback);
}


})

.controller('HomeCtrl', function ($scope, MyServices, $ionicModal,$location) {
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
	
	var homecallback=function(data,status){
		$scope.user=data;
		console.log($scope.user);
//		$location.url("/app/search");
	};
//	$scope.searchclick=function(user) {
        MyServices.home("2",homecallback);
//    };
	
//	$scope.user2={
//	area:'5',
//	category:'3's
//	};
	
	$scope.demo={};
	$scope.setname = function(name){
		$.jStorage.set
		console.log(name);
	}
	
	 $scope.memfunc = function (home) {
		 MyServices.setsearch(home);
		 console.log("area="+home.area+"category="+home.category+"membershipno="+home.membershipno);
		 $location.url("/app/search");
//		 MyServices.searchresult(home,searchcallback);
        
		 
    };

})

.controller('SearchCtrl', function ($scope, MyServices, $ionicModal,$location) {

	
	$scope.demo = [];
	$scope.area = JSON.parse($.jStorage.get("search").area);
	$scope.category = JSON.parse($.jStorage.get("search").category);
	var searchcallback=function(data,status){
		console.log(data);
		$scope.demo=data;
		$.jStorage.set("demo",data);
	};
	
	MyServices.searchresult(searchcallback);
	
	var shopprofilecallback=function(data,status){
		$scope.sp=data;
		$.jStorage.set("sp",data);
		console.log($scope.sp);
//		$location.url("/app/search");
	};
    $scope.shopclick=function(r){
		console.log(r.id);
	MyServices.profile(r.id,shopprofilecallback);
		$location.url("/app/shop");
	};  

})

.controller('ShopCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout,MyServices) {
	$scope.shop=$.jStorage.get("sp");
	console.log($scope.shop);
	$scope.pid = [];
	
		var shopprofilecallback=function(data,status){
	console.log(data);
	};
	$scope.callpurchase=function(shop){
	MyServices.profile($scope.shop.shopprofile[0].id,shopprofilecallback);
		$scope.modal.show();
	};
	
	var balanceaddcallback=function(data,status){
		
		if(data=="false")
        {
           
            console.log("balance not added");
        }
        else
        {
           console.log("balance added");
        }
	};
	
	$scope.sendamt=function(amount){
	
		$scope.amt=amount;
		console.log($scope.amt);
		$scope.pid=$.jStorage.get("sp");
		console.log($scope.pid.shopprofile[0].id);
		MyServices.balanceadd($scope.pid.shopprofile[0].id,amount,balanceaddcallback);
//		  var myPopup = $ionicPopup.show({
//            template: '<div class="text-center">
//			<h2 class="ion-checkmark-round balanced round-circle">
//			</h2><p>Please Wait for the Approval!</p>',
//            title: 'Your Request Sent!',
//            scope: $scope,
//
//        });
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

    //popup
    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
//        var myPopup = $ionicPopup.show({
//            template: '<div class="text-center">
//			<h2 class="ion-checkmark-round balanced round-circle">
//			</h2><p>Please Wait for the Approval!</p>',
//            title: 'Your Request Sent!',
//            scope: $scope,
//
//        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 1500);
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
            user1=data;
            console.log(user1);
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
	var acceptedcallback=function(data,status){
	if(data=="false")
        {
           
            console.log("Not accepted");
        }
        else
        {
           console.log("accepted");
           console.log(data);
        }
}
$scope.accept=function(){
	sd=$.jStorage.get("s");
	console.log(sd);
MyServices.accepted(sd.sellingapproval.id,sd.sellingapproval.amount,acceptedcallback);
}

	var declinecallback=function(data,status){
	if(data=="false")
        {
           
            console.log("Not decline");
        }
        else
        {
           console.log("declined");
           console.log(data);
        }
	}
	$scope.decline=function(){
		sd=$.jStorage.get("s");
	MyServices.decline(sd.sellingapproval.id,declinecallback);
	};
	

})

.controller('TransactionCtrl', function ($scope, $stateParams, $ionicPopup, $location) {
$scope.trans=$.jStorage.get("sp");
	console.log($scope.trans);
	
	var transactioncallback=function(data,status){
	console.log(data);
	}
	$scope.purchase=function(){
	MyServices.transaction(sd.sellingapproval.id,transactioncallback);
	}
	
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

.controller('ProfileCtrl', function ($scope, $stateParams, $ionicModal, $ionicSlideBoxDelegate) {

    $scope.sp=$.jStorage.get("sp");
	console.log("In profile");
	console.log($scope.sp);
	
	$scope.editpro=function(){
	$scope.sp=$.jStorage.get("sp");
		console.log("In edit profile");
	console.log($scope.sp);
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

})

.controller('YourBalCtrl', function ($scope, $stateParams, $ionicModal, $ionicPopup, $timeout,MyServices) {

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
	var balanceaddcallback=function(data,status){
	if(data=="false")
        {
           
            console.log("balance not added");
        }
        else
        {
           console.log("balance added");
           
//            $location.url("/app/home");
        }
	};
	$scope.user=$.jStorage.get("user1");
	$scope.addbalance=function(amount){
	$scope.a=amount;
		console.log($scope.a);
		 MyServices.balanceadd($scope.user,$scope.a,balanceaddcallback);
	};
});