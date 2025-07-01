<?php
function getSucursales($lat, $lng) {
    $url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=$lat&lng=$lng&limit=5";

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

function buscarProductos($sucursalId, $termino) {
    $url = "https://d3e6htiiul5ek9.cloudfront.net/prod/products/list";
    $data = json_encode([
        "sucursalId" => $sucursalId,
        "term" => $termino
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data)
    ]);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);

    if ($response === false) {
        echo "⚠️ Error cURL (productos): " . curl_error($ch);
        curl_close($ch);
        return null;
    }

    curl_close($ch);
    return json_decode($response, true);
}

// Coordenadas: microcentro de CABA
$lat = -32.9252;
$lng = -68.8443;
// $termino = 'leche';

echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Precios Claros</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; background: #f0f0f0; }
        h1, h2 { color: #333; }
        .producto { background: white; padding: 10px; margin-bottom: 10px; border-radius: 5px; border: 1px solid #ccc; }
    </style>
</head>
<body>
<h1>🛒 Resultados de Precios Claros</h1>";

$sucursales = getSucursales($lat, $lng);

if ($sucursales && isset($sucursales['sucursales'][0])) {
    $sucursal = $sucursales['sucursales'][0];
    $sucursalId = $sucursal['sucursalId'];

    echo "<h2>Sucursal: {$sucursal['sucursalNombre']} - {$sucursal['direccion']}</h2>";

    $productos = buscarProductos($sucursalId, $termino);

    if (!empty($productos)) {
        foreach ($productos as $item) {
            $prod = $item['producto'];
            $precio = $item['precio'];
            echo "<div class='producto'>
                <strong>{$prod['descripcion']}</strong><br>
                Precio: $".number_format($precio, 2)."
            </div>";
        }
    } else {
        echo "<p>No se encontraron productos con ese término.</p>";
    }

} else {
    echo "<p><strong>No se encontraron sucursales disponibles.</strong></p>";
}

echo "</body></html>";
?>
