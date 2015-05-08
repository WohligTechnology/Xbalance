var adminbase = "http://localhost/osb/";
var adminurl = adminbase + "index.php/json/";
var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function($http) {

    var returnval = {};
    returnval.login = function(user1, logincallback) {
        //        console.log("Demo");
        $http.get(adminurl + "login?membershipno=" + user1.membershipno + "&password=" + user1.password, {}).success(logincallback);
    },

    returnval.home = function(user, homecallback) {
        //        console.log("Demo");
        $http.get(adminurl + "home?user=" + user, {}).success(homecallback);
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
    returnval.searchresult = function(area, category, membershipno, searchcallback) {
        console.log("searchresult?area=" + area + "&category=" + category + "&membershipno=" + membershipno);
        $http.get(adminurl + "searchresult?area=" + area + "&category=" + category + "&membershipno=" + membershipno, {}).success(searchcallback);
    },
    returnval.getareacategory = function(area, category, getareacategorycallback) {

        $http.get(adminurl + "getareacategory?area=" + area + "&category=" + category, {}).success(getareacategorycallback);
    },
    returnval.profile = function(shop, shopprofilecallback) {
        $http.get(adminurl + "shopprofile?user=" + shop, {}).success(shopprofilecallback);

    },
    returnval.shopphoto = function(id, shopphotocallback) {
        $http.get(adminurl + "shopphoto?id=" + id, {}).success(shopphotocallback);
    },
    returnval.shopproductphoto = function(id, shopproductphotocallback) {
        $http.get(adminurl + "shopproductphoto?id=" + id, {}).success(shopproductphotocallback);
    },
    //				returnval.shopproduct=function(id,shopproductcallback){
    //	 $http.get(adminurl + "shopproduct?id="+id,{}).success(shopproductcallback);
    //	
    //	},
    returnval.updateprofile = function(id, profile, updateprofilecallback) {
        //			console.log(profile);
        $http({
            url: adminurl + "updateprofile",
            method: "POST",
            data: {
                'address': profile.address,
                'area': profile.area,
                'category': profile.category,
                'description': profile.description,
                'id': id,
                'productphoto': profile.productphoto,
                'purchasebalance': profile.purchasebalance,
                'shopcontact1': profile.shopcontact1,
                'shopcontact2': profile.shopcontact2,
                'shopemail': profile.shopemail,
                'shopname': profile.shopname,
                'shopphoto': profile.shopphoto,
                'website': profile.website
            }
        }).success(updateprofilecallback);
    },

    //	returnval.updateprofile=function(id,p,updateprofilecallback){
    //			console.log("updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website);
    //	 $http.get(adminurl + "updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website,{}).success(updateprofilecallback);
    //	},
    returnval.balanceadd = function(user, a, balanceaddcallback) {
        console.log("addbalance?user=" + user + "&amount=" + a);
        $http.get(adminurl + "addbalance?user=" + user + "&amount=" + a, {}).success(balanceaddcallback);
    },
    returnval.sellingapproval = function(sell, sellingapprovalcallback) {
        $http.get(adminurl + "sellingapproval?user=" + sell, {}).success(sellingapprovalcallback);
    },
    returnval.acceptreason = function(id, reason, acceptreasoncallback) {
        $http.get(adminurl + "acceptreason?id=" + id + "&reason=" + reason, {}).success(acceptreasoncallback);
    },
    returnval.accepted = function(userfrom, userto, amount, acceptedcallback) {
        $http.get(adminurl + "accepted?userfrom=" + userfrom + "&userto=" + userto + "&amount=" + amount, {}).success(acceptedcallback);
    },
    returnval.acceptstatus = function(id, acceptstatuscallback) {
        $http.get(adminurl + "acceptstatus?id=" + id, {}).success(acceptstatuscallback);
    },
    returnval.decline = function(id, declinecallback) {
        $http.get(adminurl + "decline?id=" + id, {}).success(declinecallback);
    },
    returnval.declinereason = function(id, reason, declinereasoncallback) {
        $http.get(adminurl + "declinereason?id=" + id + "&reason=" + reason, {}).success(declinereasoncallback);
    },
    returnval.transaction = function(u, transactioncallback) {
        $http.get(adminurl + "transaction?user=" + u, {}).success(transactioncallback);
    },
    returnval.yourbalance = function(u, yourbalancecallback) {
        $http.get(adminurl + "yourbalance?user=" + JSON.parse(u), {}).success(yourbalancecallback);
    },
    returnval.mem = function(c, memcallback) {
        console.log("searchresult?area=''&category=''&membershipno=" + c);
        $http.get(adminurl + "searchresult?area=''&category=''&membershipno=" + c, {}).success(memcallback);
    },
    returnval.purchaserequest = function(userfrom, userto, amount, purchaserequestcallback) {
        $http.get(adminurl + "purchaserequest?userfrom=" + userfrom + "&userto=" + userto + "&amount=" + amount, {}).success(purchaserequestcallback);
    },
    returnval.changepassword = function(id, pass, changepasswordcallback) {
        $http.get(adminurl + "changepassword?id=" + id + "&oldpassword=" + pass.oldpassword + "&newpassword=" + pass.newpassword + "&confirmpassword=" + pass.confirmpassword, {}).success(changepasswordcallback);
    },
    returnval.logout = function(logoutcallback) {
        $http.get(adminurl + "logout", {}).success(logoutcallback);
    };

    return returnval;
});