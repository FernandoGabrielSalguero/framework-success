<?php
// api_proxy_sucursales.php

header('Content-Type: application/json');

$lat = isset($_GET['lat']) ? $_GET['lat'] : null;
$lng = isset($_GET['lng']) ? $_GET['lng'] : null;
$limit = isset($_GET['limit']) ? $_GET['limit'] : 10;

if (!$lat || !$lng) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan coordenadas lat/lng"]);
    exit;
}

$url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=$lat&lng=$lng&limit=$limit";

$headers = [
    'Accept: application/json, text/plain, */*',
    'Accept-Language: es-AR,es;q=0.9',
    'Connection: keep-alive',
    'Referer: https://www.preciosclaros.gob.ar/',
    'Origin: https://www.preciosclaros.gob.ar'
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
    CURLOPT_TIMEOUT => 10,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_SSL_VERIFYPEER => false
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(["error" => "Error cURL: " . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);
http_response_code($httpCode);
echo $response;
