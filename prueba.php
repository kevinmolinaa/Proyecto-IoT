<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once 'class/class_user.php';
$user=new user_class();
print_r($user->getAllUsers());
?>
