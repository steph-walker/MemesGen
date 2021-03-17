<?php echo 'test'; 

$ASTRA_DB_ID = getenv('ASTRA_DB_ID');
$ASTRA_DB_REGION = getenv('ASTRA_DB_REGION');
$ASTRA_DB_TOKEN = getenv('ASTRA_DB_TOKEN');
$KEYSPACE = getenv('KEYSPACE');


print_r($_ENV);

?>