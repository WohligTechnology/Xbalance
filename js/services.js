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
		returnval.setsearch=function(search) {
			console.log("in service");
			console.log(search);
			$.jStorage.set("search",search);
			
		},
		returnval.getsearch=function(search) {
			return $.jStorage.get("search");
		},
	returnval.searchresult=function(searchcallback) {
			var category = JSON.parse($.jStorage.get("search").category);
			var area = JSON.parse($.jStorage.get("search").area);
//			var membershipno = JSON.parse($.jStorage.get("search").membershipno);
			console.log(category);
    $http.get(adminurl + "searchresult?area="+area.id+"&category="+category.id+"&membershipno=12345",{}).success(searchcallback);
		},		
	returnval.profile=function(shop,shopprofilecallback){
			console.log(shop);
	 $http.get(adminurl + "shopprofile?user="+shop,{}).success(shopprofilecallback);
	
	},
	
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
	returnval.logout=function(logoutcallback){
		 $http.get(adminurl + "logout",{}).success(logoutcallback);	
	};
	
    return returnval;
});

