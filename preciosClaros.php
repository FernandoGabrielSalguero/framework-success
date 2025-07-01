<?php
function getSucursales($lat, $lng) {
    $url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=$lat&lng=$lng&limit=5";

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    $response = curl_exec($ch);
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

    $response = curl_exec($ch);
    curl_close($ch);

    return json_decode($response, true);
}

// Coordenadas de ejemplo (revisadas)
$lat = -34.6037;  // Microcentro CABA
$lng = -58.3816;

echo "<!DOCTYPE html>
<html lang='es'>
<head>
    <meta charset='UTF-8'>
    <title>Precios Claros - Búsqueda Rápida</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2rem; background: #f8f9fa; }
        h1 { color: #007BFF; }
        .producto { padding: 10px; margin-bottom: 10px; background: #fff; border: 1px solid #ccc; border-radius: 5px; }
    </style>
</head>
<body>
<h1>🛒 Resultados de Precios Claros</h1>";

$sucursales = getSucursales($lat, $lng);
if (!empty($sucursales) && isset($sucursales[0]['id'])) {
    $sucursal = $sucursales[0];
    $sucursalId = $sucursal['id'];
    echo "<h2>Sucursal: {$sucursal['nombre']} ({$sucursal['direccion']})</h2>";

    $productos = buscarProductos($sucursalId, 'leche');

    if (!empty($productos)) {
        foreach ($productos as $item) {
            $prod = $item['producto'];
            $precio = $item['precio'];
            echo "<div class='producto'><strong>{$prod['descripcion']}</strong><br>Precio: $".number_format($precio, 2)."</div>";
        }
    } else {
        echo "<p>No se encontraron productos con ese término.</p>";
    }
} else {
    echo "<p><strong>No se encontraron sucursales para las coordenadas dadas.</strong></p>";
}

echo "</body></html>";
?>
