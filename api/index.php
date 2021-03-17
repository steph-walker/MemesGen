<?php header("Access-Control-Allow-Origin: *");

// we need following end points
// GET	Meme Templates			/api/?table_name=memegen
// GET	Saved Memes			/api/?table_name=memes_saved
// POST	Saved Memes			/api/?table_name=memes_saved + json raw payload {"columns":[{"name":"uuid","value":"349a7920-6fb3-11eb-8ec8-3f9d12c7cc4e"},{"name":"sessionid","value":"349a7920-6fb3-11eb-8ec8-3f9d12c7cc4e"},{"name":"id","value":"161865971"},{"name":"bottomtext","value":"test"},{"name":"toptext","value":"test"},{"name":"name","value":"Marked Safe From"},{"name":"memename","value":"test"},{"name":"box_count","value":2},{"name":"url","value":"https://i.imgflip.com/2odckz.jpg"},{"name":"height","value":499},{"name":"width","value":618},{"name":"image_source","value":"test"}]}
// GET	Meme Likes			/api/?table_name=memes_likes&meme_id=[id]
// POST	Meme Likes			/api/?table_name=memes_likes&meme_id=[id] + json raw payloads { "likes": "+1" } or { "likes": "-1" } 


$allowed_tables = array('memegen','memes_saved','memes_likes');

// check tables first
if ( !in_array($_GET['table_name'],$allowed_tables)) { echo 'nothing to see here'; exit(); }

// only proceeding if tables are allowed

include('common.php');

// Get Meme Likes
if(isset($_GET['meme_id']) && $_GET['table_name']=='memes_likes') {

$table_name = $_GET['table_name'];
$meme_id = $_GET['meme_id'];

$url = $ASTRA_URL . '/v1/keyspaces/' . $KEYSPACE . '/tables/' . $table_name . '/rows/' . $meme_id;

if($_SERVER['REQUEST_METHOD']=="POST") {
	$data_json = file_get_contents('php://input');
	$request = curl_init();
	$url = $ASTRA_URL . '/v2/keyspaces/' . $KEYSPACE . '/' . $table_name . '/' . $meme_id;
	curl_setopt($request, CURLOPT_URL, $url);
	curl_setopt($request, CURLOPT_HTTPHEADER, array('X-Cassandra-Token: ' . $ASTRA_DB_TOKEN, 'Content-Type: application/json','Content-Length: ' . strlen($data_json)));
	curl_setopt($request, CURLOPT_CUSTOMREQUEST, 'PUT');
	curl_setopt($request, CURLOPT_POSTFIELDS,$data_json);
	curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
	$response  = curl_exec($request);
	curl_close($request);
	echo $response;
}
else { 
	$url = $ASTRA_URL . '/v1/keyspaces/' . $KEYSPACE . '/tables/' . $table_name . '/rows/' . $meme_id;
	$request = curl_init($url);
	curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($request, CURLOPT_HTTPHEADER, array(
	    'Accept: application/json',
	    'X-Cassandra-Token: ' . $ASTRA_DB_TOKEN
	));
	$response = curl_exec($request);
	curl_close($request);
	echo $response;
}


} else if(isset($_GET['table_name'])) {

// Get table_name

$table_name = $_GET['table_name'];

$url = $ASTRA_URL . '/v1/keyspaces/' . $KEYSPACE . '/tables/' . $table_name . '/rows';

if($_SERVER['REQUEST_METHOD']=="POST") {
	$data_json = file_get_contents('php://input');
//print_r($data_json);
//exit();
	$request = curl_init();
        curl_setopt($request, CURLOPT_URL, $url);
	curl_setopt($request, CURLOPT_HTTPHEADER, array('X-Cassandra-Token: ' . $ASTRA_DB_TOKEN, 'Content-Type: application/json'));
        //curl_setopt($request, CURLOPT_HTTPHEADER, array('X-Cassandra-Token: ' . $ASTRA_DB_TOKEN, 'Content-Type: application/json','Content-Length: ' . strlen($data_json)));
	curl_setopt($request, CURLOPT_POST, 1);
        curl_setopt($request, CURLOPT_POSTFIELDS,$data_json);
        curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $response  = curl_exec($request);
        curl_close($request);
        echo $response;
} else {
	$request = curl_init($url);
	curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($request, CURLOPT_HTTPHEADER, array(
	    'Accept: application/json',
	    'X-Cassandra-Token: ' . $ASTRA_DB_TOKEN
	));
	$response = curl_exec($request);

	echo $response;
}

} else {
	echo "nothing to see here"; 
}
?>
