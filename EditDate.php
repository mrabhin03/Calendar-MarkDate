<?php
    include 'Connection.php';
    $Value=$_POST['Value'];
    $MODE=$_POST['Mode'];
    if($MODE==1){
        $sql="INSERT INTO `dates`( `Date`) VALUES ('$Value')";
    }else{
        $sql="DELETE FROM `dates` WHERE Date='$Value'";
    }

    $conn->query($sql);

?>