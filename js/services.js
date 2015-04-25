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
	returnval.searchresult=function(user2,searchcallback) {
//        console.log("Demo");
        $http.get(adminurl + "searchresult?area="+user2.area+"&category="+user2.category,{}).success(searchcallback);
		};		
    return returnval;
});
