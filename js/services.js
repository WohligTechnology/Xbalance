//var adminbase = "http://wohlig.co.in/osb/";
var adminbase = "http://localhost/osb/";
var adminurl = adminbase + "index.php/json/";
var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
var user = {};
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function($http) {

    user = $.jStorage.get("user");
    var returnval = {};
    returnval.login = function(user1, logincallback) {
        //        console.log("Demo");
        $http.get(adminurl + "login?membershipno=" + user1.membershipno + "&password=" + user1.password + "&token=" + $.jStorage.get("token"), {}).success(logincallback);
    },


    returnval.home = function(user, homecallback) {
        //        console.log("Demo");
        $http.get(adminurl + "home?user=" + user, {}).success(homecallback);
    },
		returnval.searchproduct = function(product, searchproductcallback) {
        //        console.log("Demo");
        $http.get(adminurl + "searchproduct?product=" + product, {}).success(searchproductcallback);
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
    returnval.getallcategory1 = function(getallcategory1callback) {
        $http.get(adminurl + "getallcategory1", {}).success(getallcategory1callback);

    },

    returnval.getarea = function(getareacallback) {
        $http.get(adminurl + "getarea", {}).success(getareacallback);

    },
    returnval.searchresult = function(area, category, online,offline,searchcallback) {
		console.log("searchresult?area=" + area + "&category=" + category + "&online=" + online + "&offline=" + offline);
        $http.get(adminurl + "searchresult?area=" + area + "&category=" + category + "&online=" + online + "&offline=" + offline, {}).success(searchcallback);
    },
    returnval.getareacategory = function(area, category, getareacategorycallback) {

        $http.get(adminurl + "getareacategory?area=" + area + "&category=" + category, {}).success(getareacategorycallback);
    },
    returnval.profile = function(shop, shopprofilecallback) {
        $http.get(adminurl + "shopprofile?user=" + shop, {}).success(shopprofilecallback);

    },
	returnval.viewmyproducts = function(myid, viewmyproductscallback) {
        $http.get(adminurl + "viewmyproducts?user=" + myid, {}).success(viewmyproductscallback);
    },
    returnval.shopphoto = function(id, shopphotocallback) {
        $http.get(adminurl + "shopphoto?id=" + id, {}).success(shopphotocallback);
    },
    returnval.checkstatus = function(orderid, statuscallback) {
        $http.get(adminurl + "checkorderstatus?orderid=" + orderid, {}).success(statuscallback);
    },
    returnval.shopproductphoto = function(id, shopproductphotocallback) {
        $http.get(adminurl + "shopproductphoto?id=" + id, {}).success(shopproductphotocallback);
    },
    //				returnval.shopproduct=function(id,shopproductcallback){
    //	 $http.get(adminurl + "shopproduct?id="+id,{}).success(shopproductcallback);
    //	
    //	},
    returnval.updateprofile = function(id, profile, updateprofilecallback) {
        //        			console.log(profile);
        $http({
            url: adminurl + "updateprofile",
            method: "POST",
            data: {
                'id': id,
                'shopname': profile.shopname,
                'address': profile.address,
                'description': profile.description,
                'shopcontact1': profile.shopcontact1,
                'shopcontact2': profile.shopcontact2,
                'shopemail': profile.shopemail,
                'website': profile.website
            }
        }).success(updateprofilecallback);
    },
		returnval.createproduct = function(id, ap, createproductcallback) {
        //        			console.log(profile);
        $http({
            url: adminurl + "createproduct",
            method: "POST",
            data: {
                'name': ap.name,
                'sku': ap.sku,
                'price': ap.price,
                'description': ap.description,
                'status': ap.status,
                'user': id,
                'quantity': ap.quantity
            }
        }).success(createproductcallback);
    },
		 returnval.becomeamember = function(register,becomeamembercallback) {
        //        			console.log(profile);
        $http({
            url: adminurl + "becomeamember",
            method: "POST",
            data: {
                'name': register.name,
                'email': register.email,
                'number': register.number,
                'message': register.message
            }
        }).success(becomeamembercallback);
    },
		returnval.editproduct = function(product,id,editproductcallback) {
        $http({
            url: adminurl + "editproduct",
            method: "POST",
            data: {
               'id': product.productid,
               'name': product.name,
                'sku': product.sku,
                'price': product.price,
                'description': product.description,
                'status': product.status,
                'user': id,
                'quantity': product.quantity
            }
        }).success(editproductcallback);
    },
		returnval.changeproductstatus = function(product,id,changeproductstatuscallback) {
        //        			console.log(profile);
        $http({
            url: adminurl + "changeproductstatus",
            method: "POST",
            data: {
               'id': product.id,
               'name': product.name
            }
        }).success(changeproductstatuscallback);
    },
	 returnval.getsingleproduct = function(id, getsingleproductcallback) {
        $http.get(adminurl + "getsingleproduct?id=" + id, {}).success(getsingleproductcallback);
    },	
 returnval.viewmyproductorders = function(user,viewmyproductorderscallback) {
        //        			console.log(profile);
        $http({
            url: adminurl + "viewmyproductorders",
            method: "POST",
            data: {
                'userid': user,
            }
        }).success(viewmyproductorderscallback);
    },
   /* 	returnval.updateprofile=function(id,p,updateprofilecallback){
    			console.log("updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website);
    	 $http.get(adminurl + "updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website,{}).success(updateprofilecallback);
    	},*/
    returnval.updatecat = function(user, id, updatecatcallback) {
        //		console.log("updatecat?user=" + user + "&id=" + id);
        $http.get(adminurl + "updatecat?user=" + user + "&id=" + id, {}).success(updatecatcallback);
    }
    returnval.updatearea = function(user, id, updateareacallback) {
        //		console.log("updatearea?user=" + user + "&id=" + id);
        $http.get(adminurl + "updatearea?user=" + user + "&id=" + id, {}).success(updateareacallback);
    }
    returnval.balanceadd = function(user, a, balanceaddcallback, reason) {
        console.log("addbalance?user=" + user + "&amount=" + a);
        $http.get(adminurl + "addbalance?user=" + user + "&amount=" + a + "&reason=" + reason, {}).success(balanceaddcallback);
    },
    returnval.sellingapproval = function(sell, sellingapprovalcallback) {
        $http.get(adminurl + "sellingapproval?user=" + sell, {}).success(sellingapprovalcallback);
    },
    returnval.accepted = function(id, reason, status, acceptstatuscallback) {
        $http.get(adminurl + "accepted?id=" + id + "&reason=" + reason + "&status=" + status, {}).success(acceptstatuscallback);
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
    returnval.purchaserequest = function(userfrom, userto, amount, reason, purchaserequestcallback) {
        $http.get(adminurl + "purchaserequest?userfrom=" + userfrom + "&userto=" + userto + "&amount=" + amount + "&reason=" + reason, {}).success(purchaserequestcallback);
    },
    returnval.changepassword = function(id, pass, changepasswordcallback) {
        $http.get(adminurl + "changepassword?id=" + id + "&oldpassword=" + pass.oldpassword + "&newpassword=" + pass.newpassword + "&confirmpassword=" + pass.confirmpassword, {}).success(changepasswordcallback);
    },
    returnval.logout = function(loginid,logoutcallback) {
        $http.get(adminurl + "logout?loginid=" + loginid, {}).success(logoutcallback);
    };
    returnval.getshopidmebership = function(data, callback) {
        $http.get(adminurl + "shopprofilemem?mem=" + data).success(function(data) {
            console.log(data.id);
            callback(data.id)
        });
    };
    return returnval;
});