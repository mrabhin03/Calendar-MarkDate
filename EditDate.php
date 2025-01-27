<?php
    include 'Connection.php';
    $Value=$_POST['Value'];
    $MODE=$_POST['Mode'];
    if($MODE==1){
        $sql="INSERT INTO `dates`( `Date`) VALUES ('$Value')";
    }else{
        $sql="DELETE FROM `dates` WHERE ID='$Value'";
    }

    $conn->query($sql);

    if($MODE==1){
        $select ="SELECT `ID` FROM `dates` ORDER BY `ID` DESC LIMIT 1";
        $data=$conn->query($select)->fetch_assoc();
        echo $data['ID'];
    }

?>