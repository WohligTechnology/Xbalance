var adminbase = "http://localhost/osb/";
var adminurl=adminbase+"index.php/json/";
var myservices = angular.module('myservices', []);
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function ($http) {
  
    var returnval={};
        returnval.login=function(user1,logincallback) {
//        console.log("Demo");
        $http.get(adminurl + "login?membershipno="+user1.membershipno+"&password="+user1.password,{}).success(logincallback);
    },
			
	 returnval.home=function(user,homecallback) {
//        console.log("Demo");
        $http.get(adminurl + "home?user="+user,{}).success(homecallback);
		},
//		returnval.setsearch=function(search) {
//			console.log("in service");
//			console.log(search);
//			$.jStorage.set("search",search);
//			
//		},
//		returnval.getsearch=function(search) {
//			return $.jStorage.get("search");
//		},
	returnval.searchresult=function(area,category,membershipno,searchcallback) {
			console.log("searchresult?area="+area+"&category="+category+"&membershipno="+membershipno);
    $http.get(adminurl + "searchresult?area="+area+"&category="+category+"&membershipno="+membershipno,{}).success(searchcallback);
		},		
    returnval.getareacategory=function(area,category,getareacategorycallback) {
			console.log("getareacategory?area="+area+"&category="+category);
    $http.get(adminurl + "getareacategory?area="+area+"&category="+category,{}).success(getareacategorycallback);
		},
	returnval.profile=function(shop,shopprofilecallback){
	 $http.get(adminurl + "shopprofile?user="+shop,{}).success(shopprofilecallback);
	
	},
//		 updateprofile:function(profile)
//          {
//             return $http({
//                url: admin_url + "json/updateprofile",
//                method: "POST",
//                data: {
//					address: "Navimumbai"
//					area: null
//					category: "Personal computer"
//					description: "Pancharatna Navimumbai"
//					id: "14"
//					productphoto: "kmkdjkfabjv"
//					purchasebalance: "hdjfbrbh"
//					shopcontact1: "5457845848"
//					shopcontact2: "5454545"
//					shopemail: "hdjjdhb@gmail.com"
//					shopname: "garam masala"
//					shopphoto: "erjhjewj"
//					website: "www.abc.com"
//                }
//            });
//          },	
			
//	returnval.updateprofile=function(id,p,updateprofilecallback){
//			console.log("updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website);
//	 $http.get(adminurl + "updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website,{}).success(updateprofilecallback);
//	},
	returnval.balanceadd=function(user,a,balanceaddcallback){
//			console.log("addbalance?user="+JSON.parse(user)+"&amount="+a);
		 $http.get(adminurl + "addbalance?user="+JSON.parse(user)+"&amount="+a,{}).success(balanceaddcallback);	
	},
	returnval.sellingapproval=function(sell,sellingapprovalcallback){
		 $http.get(adminurl + "sellingapproval?user="+JSON.parse(sell),{}).success(sellingapprovalcallback);	
	},
	returnval.accepted=function(user,a,acceptedcallback){
		 $http.get(adminurl + "accepted?user="+user+"&amount="+a,{}).success(acceptedcallback);	
	},
	returnval.decline=function(id,declinecallback){
		 $http.get(adminurl + "decline?id="+id,{}).success(declinecallback);	
	},
	returnval.transaction=function(u,transactioncallback){
		 $http.get(adminurl + "transaction?user="+u,{}).success(transactioncallback);	
	},
	returnval.yourbalance=function(u,yourbalancecallback){
		 $http.get(adminurl + "yourbalance?user="+JSON.parse(u),{}).success(yourbalancecallback);	
	},
	returnval.mem=function(c,memcallback){
			console.log("searchresult?area=''&category=''&membershipno="+c);
		 $http.get(adminurl + "searchresult?area=''&category=''&membershipno="+c,{}).success(memcallback);	
	},
			returnval.purchaserequest=function(userfrom,userto,amount,purchaserequestcallback){
		 $http.get(adminurl + "purchaserequest?userfrom="+userfrom+"&userto="+userto+"&amount="+amount,{}).success(purchaserequestcallback);	
	},
		returnval.changepassword=function(id,pass,changepasswordcallback){
$http.get(adminurl + "changepassword?id="+id+"&oldpassword="+pass.oldpassword+"&newpassword="+pass.newpassword+"&confirmpassword="+pass.confirmpassword,{}).success(changepasswordcallback);	
	},	
	returnval.logout=function(logoutcallback){
		 $http.get(adminurl + "logout",{}).success(logoutcallback);	
	};
	
    return returnval;
});



