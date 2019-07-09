<?php
	require "connect.php";
	
	
	if(isset($_POST['username']) || isset($_POST['submit'])){
		$username=@$_POST['username'];
	}else{
		exit('非法操作');
	}
	
	
	
	$query="select * from user where username='$username'";
	$result=mysql_query($query);
	
	if(mysql_fetch_array($result)){
		echo 'false';
	}else{
		echo 'true';
	}
	
	
	if(isset($_POST['submit']) && $_POST['submit']=="注册"){
		$user=$_POST['username'];
		$pass=md5($_POST['password']);
		$email=$_POST['email'];
		
		$query="insert user(uid,username,password,email,regdate) values(null,'$user','$pass','$email',NOW())";
		mysql_query($query);
		header('location:../src/login.html');
	}
?>