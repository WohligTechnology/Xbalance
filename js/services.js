var adminbase = "http://localhost/osb/";
var adminurl=adminbase+"index.php/json/";
var myservices = angular.module('myservices', []);
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function ($http) {
  
    var returnval={};
    
        
        returnval.login=function(user,logincallback) {
//        console.log("Demo");
        $http.get(adminurl + "login?membershipno="+user.membershipno+"&password="+user.password,{}).success(logincallback);
    };
    return returnval;
});
