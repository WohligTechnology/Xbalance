<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

$hashData = "1fef78ef406c6178f253e8c11335d171"; //Pass your Registered Secret Key

unset($_GET['submitted']);
ksort($_GET);
foreach ($_GET as $key => $value){
	if (strlen($value) > 0) {
		$hashData .= '|'.$value;
	}
}
if (strlen($hashData) > 0) {
	$secure_hash = strtoupper(hash("sha512",$hashData));
	// $secure_hash = strtoupper(md5($hashData));
}

echo "<pre>";
$hash = "ebskey"."|".urlencode($_GET['account_id'])."|".urlencode($_GET['amount'])."|".urlencode($_GET['reference_no'])."|".$_GET['return_url']."|".urlencode($_GET['mode']);
// echo $hash;
// $secure_hash = md5($hash);
//
// //print_r($secure_hash_md5);
// exit;
?>
<html>
<body onLoad="document.payment.submit();">
<form action="https://secure.ebs.in/pg/ma/payment/request" name="payment" method="POST">
<table>
<input type="hidden" value="<?php echo $_GET['account_id'];?>" name="account_id"/><tbody><tr><td>account_id</td><td><?php echo $_GET['account_id'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['address'];?>" name="address"/><tr><td>address</td><td><?php echo $_GET['address'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['amount'];?>" name="amount"/><tr><td>amount</td><td><?php echo $_GET['amount'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['bank_code'];?>" name="bank_code"/><tr><td>bank_code</td><?php echo $_GET['bank_code'];?><td/></tr>
<input type="hidden" value="<?php echo $_GET['card_brand'];?>" name="card_brand"/><tr><td>card_brand</td><td><?php echo $_GET['card_brand'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['channel'];?>" name="channel"/><tr><td>channel</td><td><?php echo $_GET['channel'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['city'];?>" name="city"/><tr><td>city</td><td><?php echo $_GET['city'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['country'];?>" name="country"/><tr><td>country</td><td><?php echo $_GET['country'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['currency'];?>" name="currency"/><tr><td>currency</td><td><?php echo $_GET['currency'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['description'];?>" name="description"/><tr><td>description</td><td><?php echo $_GET['description'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['display_currency'];?>" name="display_currency"/><tr><td>display_currency</td><td><?php echo $_GET['display_currency'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['display_currency_rates'];?>" name="display_currency_rates"/><tr><td>display_currency_rates</td><td><?php echo $_GET['display_currency_rates'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['email'];?>" name="email"/><tr><td>email</td><td><?php echo $_GET['email'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['emi'];?>" name="emi"/><tr><td>emi</td><td><?php echo $_GET['emi'];?><td/></tr>
<input type="hidden" value="<?php echo $_GET['mode'];?>" name="mode"/><tr><td>mode</td><td><?php echo $_GET['mode'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['name'];?>" name="name"/><tr><td>name</td><td><?php echo $_GET['name'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['page_id'];?>" name="page_id"/><tr><td>page_id</td><td><?php echo $_GET['page_id'];?><td/></tr>
<input type="hidden" value="<?php echo $_GET['payment_mode'];?>" name="payment_mode"/><tr><td>payment_mode</td><td><?php echo $_GET['payment_mode'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['payment_option'];?>" name="payment_option"/><tr><td>payment_option</td><?php echo $_GET['payment_option'];?><td/></tr>
<input type="hidden" value="<?php echo $_GET['phone'];?>" name="phone"/><tr><td>phone</td><td><?php echo $_GET['phone'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['postal_code'];?>" name="postal_code"/><tr><td>postal_code</td><td><?php echo $_GET['postal_code'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['reference_no'];?>" name="reference_no"/><tr><td>reference_no</td><td><?php echo $_GET['reference_no'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['return_url']; ?>" name="return_url"/><tr><td>return_url</td><td><?php echo $_GET['return_url']; ?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_address'];?>" name="ship_address"/><tr><td>ship_address</td><td><?php echo $_GET['ship_address'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_city'];?>" name="ship_city"/><tr><td>ship_city</td><td><?php echo $_GET['ship_city'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_country'];?>" name="ship_country"/><tr><td>ship_country</td><td><?php echo $_GET['ship_country'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_name'];?>" name="ship_name"/><tr><td>ship_name</td><td><?php echo $_GET['ship_name'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_phone'];?>" name="ship_phone"/><tr><td>ship_phone</td><td><?php echo $_GET['ship_phone'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_postal_code'];?>" name="ship_postal_code"/><tr><td>ship_postal_code</td><td><?php echo $_GET['ship_postal_code'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['ship_state'];?>" name="ship_state"/><tr><td>ship_state</td><td><?php echo $_GET['ship_state'];?></td></tr>
<input type="hidden" value="<?php echo $_GET['state'];?>" name="state"/><tr><td>state</td><td><?php echo $_GET['state'];?></td></tr>
<input type="hidden" value="<?php echo $secure_hash; ?>" name="secure_hash"/><tr><td>secure_hash</td><td><?php echo $secure_hash;?></td></tr></tbody></table>
<button onclick="document.payment.submit();"> SUBMIT </button>
</form>
</body>
</html>
