var adminbase = "http://wohlig.co.in/osb/";
//var adminbase = "http://localhost/osb/";
var adminurl = adminbase + "index.php/json/";
var myservices = angular.module('myservices', []);
var imgpath = adminbase + "uploads/";
var user = {};
//var user=$.jStorage.get("user");

myservices.factory('MyServices', function ($http) {

	user = $.jStorage.get("user");
	var returnval = {};
	returnval.login = function (user1, logincallback) {
			//        console.log("Demo");
			$http.get(adminurl + "login?membershipno=" + user1.membershipno + "&password=" + user1.password + "&token=" + $.jStorage.get("token"), {}).success(logincallback);
		},


		returnval.home = function (user, homecallback) {
			//        console.log("Demo");
			$http.get(adminurl + "home?user=" + user, {}).success(homecallback);
		},
		returnval.searchproduct = function (productname, membershipno, category, searchproductcallback) {
			console.log("searchproduct?product=" + productname + "&membershipno=" + membershipno + "&category=" + category);
			$http.get(adminurl + "searchproduct?product=" + productname + "&membershipno=" + membershipno + "&category=" + category, {}).success(searchproductcallback);
		},
		returnval.getallcategory1 = function (getallcategory1callback) {
			$http.get(adminurl + "getallcategory1", {}).success(getallcategory1callback);

		},

		returnval.getarea = function (getareacallback) {
			$http.get(adminurl + "getarea", {}).success(getareacallback);

		},
		returnval.searchresult = function (area, category, online, offline, searchcallback) {
			console.log("searchresult?area=" + area + "&category=" + category + "&online=" + online + "&offline=" + offline);
			$http.get(adminurl + "searchresult?area=" + area + "&category=" + category + "&online=" + online + "&offline=" + offline, {}).success(searchcallback);
		},
		returnval.getareacategory = function (area, category, getareacategorycallback) {

			$http.get(adminurl + "getareacategory?area=" + area + "&category=" + category, {}).success(getareacategorycallback);
		},
		returnval.profile = function (shop, shopprofilecallback) {
			$http.get(adminurl + "shopprofile?user=" + shop, {}).success(shopprofilecallback);

		},
		returnval.viewmyproducts = function (myid, viewmyproductscallback) {
			$http.get(adminurl + "viewmyproducts?user=" + myid, {}).success(viewmyproductscallback);
		},
		returnval.shopphoto = function (id, shopphotocallback) {
			$http.get(adminurl + "shopphoto?id=" + id, {}).success(shopphotocallback);
		},
		returnval.checkstatus = function (orderid, statuscallback) {
			$http.get(adminurl + "checkorderstatus?orderid=" + orderid, {}).success(statuscallback);
		},
		returnval.shopproductphoto = function (id, shopproductphotocallback) {
			$http.get(adminurl + "shopproductphoto?id=" + id, {}).success(shopproductphotocallback);
		},
		//				returnval.shopproduct=function(id,shopproductcallback){
		//	 $http.get(adminurl + "shopproduct?id="+id,{}).success(shopproductcallback);
		//	
		//	},
		returnval.updateprofile = function (id, profile, updateprofilecallback) {
			//        			console.log(profile);
			$http({
				url: adminurl + "updateprofile",
				method: "POST",
				data: {
					'id': id,
					'shopname': profile.shopname,
					'address': profile.billingaddress,
					'description': profile.description,
					'shopcontact1': profile.shopcontact1,
					'shopcontact2': profile.shopcontact2,
					'shopemail': profile.shopemail,
					'website': profile.website
				}
			}).success(updateprofilecallback);
		},
		returnval.createproduct = function (id, ap,img, createproductcallback) {
			console.log(ap.status);
			console.log(img);
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
					'quantity': ap.quantity,
					'category': ap.category,
					'image': img
				}
			}).success(createproductcallback);
		},
		returnval.becomeamember = function (register, becomeamembercallback) {
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
		returnval.editproduct = function (product, id, editproductcallback) {
			//		console.log(product.id);
			//		console.log(product.name);
			//		console.log(product.sku);
			//		console.log(product.price);
			//		console.log(product.description);
			//		console.log(product.status);
			//		console.log(product.user);
			//		console.log(product.quantity);
			//		console.log(product.category);
			$http({
				url: adminurl + "editproduct",
				method: "POST",
				data: {
					'id': product.id,
					'name': product.name,
					'sku': product.sku,
					'price': product.price,
					'description': product.description,
					'status': product.status,
					'user': id,
					'quantity': product.quantity,
					'category': product.category
				}
			}).success(editproductcallback);
		},
		returnval.changeproductstatus = function (id, status, changeproductstatuscallback) {
			//        			console.log(profile);
			$http({
				url: adminurl + "changeproductstatus",
				method: "POST",
				data: {
					'productid': id,
					'status': status
				}
			}).success(changeproductstatuscallback);
		},

		returnval.getalluserproducts = function (id, getalluserproductscallback) {
			console.log(id);
			$http({
				url: adminurl + "getalluserproducts",
				method: "POST",
				data: {
					'userid': id,
				}
			}).success(getalluserproductscallback);
		},
		returnval.getuserdetails = function (id, getuserdetailscallback) {
			console.log(id);
			$http({
				url: adminurl + "getuserdetails",
				method: "POST",
				data: {
					'userid': id,
				}
			}).success(getuserdetailscallback);
		},
		returnval.getsingleproduct = function (id, getsingleproductcallback) {
			$http.get(adminurl + "getsingleproduct?id=" + id, {}).success(getsingleproductcallback);
		},
		returnval.buyproduct = function (userid, prodid, user, buyproductcallback) {
			console.log(userid);
			console.log(prodid);
			console.log(user);
			$http({
				url: adminurl + "buyproduct",
				method: "POST",
				data: {
					'userid': userid,
					'productid': prodid,
					'quantity': user.quantity,
					'name': user.name,
					'email': user.email,
					'contactno': user.personalcontact,
					'billingaddress': user.billingaddress,
					'billingcity': user.billingcity,
					'billingstate': user.billingstate,
					'billingcountry': user.billingcountry,
					'billingpincode': user.billingpincode,
					'shippingaddress': user.shippingaddress,
					'shippingcity': user.shippingcity,
					'shippingcountry': user.shippingcountry,
					'shippingstate': user.shippingstate,
					'shippingpincode': user.shippingpincode,
					'logisticcharge': user.logisticcharge
				}
			}).success(buyproductcallback);
		},
		returnval.viewmyproductorders = function (user, viewmyproductorderscallback) {
			//        			console.log(profile);
			$http({
				url: adminurl + "viewmyproductorders",
				method: "POST",
				data: {
					'userid': user,
				}
			}).success(viewmyproductorderscallback);
		},
		returnval.viewallorders = function (user, viewallorderscallback) {
			//        			console.log(profile);
			$http({
				url: adminurl + "viewallorders",
				method: "POST",
				data: {
					'userid': user,
				}
			}).success(viewallorderscallback);
		},
		/* 	returnval.updateprofile=function(id,p,updateprofilecallback){
		 			console.log("updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website);
		 	 $http.get(adminurl + "updateprofile?id="+id+"&shopname="+p.shopname+"&area="+p.area+"&category="+p.category+"&address="+p.address+"&description="+p.description+"&shopcontact1="+p.shopcontact1+"&shopcontact2="+p.shopcontact2+"&shopemail="+p.shopemail+"&website="+p.website,{}).success(updateprofilecallback);
		 	},*/
		returnval.updatecat = function (user, id, updatecatcallback) {
			console.log("updatecat?user=" + user + "&id=" + id);
			$http.get(adminurl + "updatecat?user=" + user + "&id=" + id, {}).success(updatecatcallback);
		}
	returnval.updatearea = function (user, id, updateareacallback) {
		//		console.log("updatearea?user=" + user + "&id=" + id);
		$http.get(adminurl + "updatearea?user=" + user + "&id=" + id, {}).success(updateareacallback);
	}
	returnval.balanceadd = function (user, a, balanceaddcallback, reason) {
			console.log("addbalance?user=" + user + "&amount=" + a);
			$http.get(adminurl + "addbalance?user=" + user + "&amount=" + a + "&reason=" + reason, {}).success(balanceaddcallback);
		},
		returnval.sellingapproval = function (sell, sellingapprovalcallback) {
			$http.get(adminurl + "sellingapproval?user=" + sell, {}).success(sellingapprovalcallback);
		},
		returnval.accepted = function (id, reason, status, acceptstatuscallback) {
			$http.get(adminurl + "accepted?id=" + id + "&reason=" + reason + "&status=" + status, {}).success(acceptstatuscallback);
		},
		returnval.transaction = function (u, transactioncallback) {
			$http.get(adminurl + "transaction?user=" + u, {}).success(transactioncallback);
		},
		returnval.getnotification = function (id, getnotificationcallback) {
			$http.get(adminurl + "getnotification?userid=" + id, {}).success(getnotificationcallback);
		},
		returnval.yourbalance = function (u, yourbalancecallback) {
			$http.get(adminurl + "yourbalance?user=" + JSON.parse(u), {}).success(yourbalancecallback);
		},
		returnval.mem = function (c, memcallback) {
			console.log("searchresult?area=''&category=''&membershipno=" + c);
			$http.get(adminurl + "searchresult?area=''&category=''&membershipno=" + c, {}).success(memcallback);
		},
		returnval.purchaserequest = function (userfrom, userto, amount, reason, purchaserequestcallback) {
			$http.get(adminurl + "purchaserequest?userfrom=" + userfrom + "&userto=" + userto + "&amount=" + amount + "&reason=" + reason, {}).success(purchaserequestcallback);
		},
		returnval.changepassword = function (id, pass, changepasswordcallback) {
			$http.get(adminurl + "changepassword?id=" + id + "&oldpassword=" + pass.oldpassword + "&newpassword=" + pass.newpassword + "&confirmpassword=" + pass.confirmpassword, {}).success(changepasswordcallback);
		},
		returnval.logout = function (loginid, logoutcallback) {
			$http.get(adminurl + "logout?loginid=" + loginid, {}).success(logoutcallback);
		};
	returnval.getshopidmebership = function (data, callback) {
		$http.get(adminurl + "shopprofilemem?mem=" + data).success(function (data) {
			console.log(data.id);
			callback(data.id)
		});
	};
	return returnval;
});