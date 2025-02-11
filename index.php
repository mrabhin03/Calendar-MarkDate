<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Activities</title>
    <link rel="stylesheet" href="style.css?v=<?=time()?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="Assets/Logo192x192.png">
    <link rel="manifest" href="manifest.json">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <script src="script.js?v=<?=time()?>" defer></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
  </head>
  <?php
  function DateDiff($Last,$Today){
    $date1 = new DateTime($Last);
    $date2 = new DateTime($Today);
    $diff = $date1->diff($date2);
    return $diff->days;
  }
  include 'Connection.php';
  $sql="SELECT * FROM dates";
  $values=$conn->query($sql);

  // $sql2="SELECT Date FROM dates ORDER BY Date DESC";
  // $DatesValue=$conn->query($sql2)->fetch_assoc()['Date'];
  // $today = date("Y-m-d");
  
  ?>
  <body>
    <div class="wrapper">
      <header>
        <p class="current-date"></p>
        <div class="icons">
          <span id="prev" class="material-symbols-rounded"><ion-icon name="chevron-back-outline"></ion-icon></span>
          <span id="next" class="material-symbols-rounded"><ion-icon name="chevron-forward-outline"></ion-icon></span>
        </div>
      </header>
      <div class='details'>
        <div id='gapDate'>
          <div id='gapBar'></div>
        </div>
      </div>
      <div class="calendar">
        <ul class="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul class="days"></ul>
      </div>
    </div>
  </body>
  <script>
    calendar=[];
    <?php
    while($value=$values->fetch_assoc()){
      echo "calendar.push({Date:'".$value['Date']."'});";
    }
    ?>


    window.onload = function () {
            loadData(calendar);
    };
  </script>
  
</html>