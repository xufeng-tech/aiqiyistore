<?php
	require "connect.php";
	
	if(isset($_POST['name'])){
		$name=$_POST['name'];
		$result=$conn->query("select * from user where username='$name'");
		if($result->fetch_assoc()){
			echo true;
		}else{
			echo false;
		}
	}


	if(isset($_POST['submit'])){
		$user=$_POST['username'];
		$pass=md5($_POST['password']);
		$email=$_POST['email'];
		echo $user;
		
		$query="insert user(uid,username,password,email,regdate) values(null,'$user','$pass','$email',NOW())";
		mysql_query($query);
		header('location:../src/login.html');
	}
?>