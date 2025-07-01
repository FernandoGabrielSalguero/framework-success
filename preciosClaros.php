<?php
$url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=-32.9252&lng=-68.8443&limit=3";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36');
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/json, text/plain, */*',
    'Accept-Language: es-AR,es;q=0.9',
    'Connection: keep-alive',
    'Referer: https://www.preciosclaros.gob.ar/',
    'Origin: https://www.preciosclaros.gob.ar'
]);

$response = curl_exec($ch);

if ($response === false) {
    echo "❌ Error: " . curl_error($ch);
} else {
    echo "✅ Respuesta:<br><pre>" . htmlspecialchars($response) . "</pre>";
}

curl_close($ch);
?>
