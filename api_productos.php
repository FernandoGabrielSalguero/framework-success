<?php
// api_productos.php

header('Content-Type: application/json');

$sucursalId = $_GET['sucursalId'] ?? null;
$term = $_GET['term'] ?? null;

if (!$sucursalId || !$term) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos']);
    exit;
}

$url = "https://d3e6htiiul5ek9.cloudfront.net/prod/products/list";
$data = json_encode([
    "sucursalId" => $sucursalId,
    "term" => $term
]);

$headers = [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data),
    'Accept: application/json, text/plain, */*',
    'Accept-Language: es-AR,es;q=0.9',
    'Connection: keep-alive',
    'Referer: https://www.preciosclaros.gob.ar/',
    'Origin: https://www.preciosclaros.gob.ar'
];

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_USERAGENT => 'Mozilla/5.0',
    CURLOPT_TIMEOUT => 10,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $data,
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_SSL_VERIFYPEER => false
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($httpCode);
echo $response;
