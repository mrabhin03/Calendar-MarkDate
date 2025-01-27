<?php
  $conn=new mysqli("localhost","root","","calenderdata");
  if($conn->connect_error){
    include 'Connection2.php';
  }
?>