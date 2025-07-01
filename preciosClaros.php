<?php
function getSucursales($lat, $lng) {
    $url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=$lat&lng=$lng&limit=10";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0'); // Simula navegador real
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);

    if ($response === false) {
        echo "⚠️ Error cURL: " . curl_error($ch);
        curl_close($ch);
        return null;
    }

    curl_close($ch);
    return json_decode($response, true);
}

// Coordenadas: Mendoza
$lat = -32.9252;
$lng = -68.8443;

echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Precios Claros - Sucursales</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; background: #f0f0f0; }
        h1, h2 { color: #333; }
        .sucursal { background: white; padding: 10px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc; }
    </style>
</head>
<body>
<h1>🏪 Sucursales cercanas</h1>";

$sucursales = getSucursales($lat, $lng);

if ($sucursales && !empty($sucursales['sucursales'])) {
    foreach ($sucursales['sucursales'] as $sucursal) {
        echo "<div class='sucursal'>
            <strong>{$sucursal['sucursalNombre']}</strong><br>
            Dirección: {$sucursal['direccion']}<br>
            Localidad: {$sucursal['localidad']}<br>
            Provincia: {$sucursal['provincia']}<br>
            Distancia: {$sucursal['distanciaDescripcion']}<br>
            Tipo: {$sucursal['sucursalTipo']}<br>
            Bandera: {$sucursal['banderaDescripcion']}
        </div>";
    }
} else {
    echo "<p><strong>No se encontraron sucursales disponibles.</strong></p>";
}

echo "</body></html>";
?>
