
<?php
//include 'Pusher.php'
require 'vendor/autoload.php';

 $options = array(
    'cluster' => 'eu',
    'encrypted' => true
  );
  $pusher = new Pusher\Pusher(
    'e6a821f2402fdaa0e1ff',
    '5d1bebca4a43bd7f058a',
    '472709',
    $options
  );


  echo $pusher->socket_auth($_POST['channel_name'], $_POST['socket_id']);

?>
