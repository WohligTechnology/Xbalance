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
		};		
    return returnval;
});
