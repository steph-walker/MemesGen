<?php

// .env variables for credentials are also mapped in www.conf
$ASTRA_DB_ID = getenv('ASTRA_DB_ID');
$ASTRA_DB_REGION = getenv('ASTRA_DB_REGION');
$ASTRA_DB_TOKEN = getenv('ASTRA_DB_TOKEN');
$KEYSPACE = getenv('KEYSPACE');

$ASTRA_URL = 'https://' . $ASTRA_DB_ID . '-' . $ASTRA_DB_REGION . '.apps.astra.datastax.com/api/rest';

?>