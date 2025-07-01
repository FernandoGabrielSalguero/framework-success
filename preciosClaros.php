<?php
$url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=-32.9252&lng=-68.8443&limit=3";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);

if ($response === false) {
    echo "❌ Error: " . curl_error($ch);
} else {
    echo "✅ Respuesta cruda:<br><pre>" . htmlspecialchars($response) . "</pre>";
}

curl_close($ch);