<?php

// move these to env vars

// .env variables for credentials are also mapped in www.conf
$KEYSPACE = getenv('KEYSPACE'); //'memegen2';
$K8S_USERNAME = getenv('K8S_USERNAME'); //'k8ssandra-superuser';
$K8S_PASSWORD = getenv('K8S_PASSWORD'); //'OydXi6iO4MEUUqODGAC3';
$K8S_AUTH_URL = getenv('K8S_AUTH_URL'); //'http://10.43.22.217:8081/v1/auth';
$STARGATE_URL = getenv('STARGATE_URL'); //'http://10.43.22.217:8082'; // no trailing slash here on purpose
$GRAPHQL_URL = getenv('GRAPHQL_URL'); //'http://10.43.22.217:8080/graphql/';
?>