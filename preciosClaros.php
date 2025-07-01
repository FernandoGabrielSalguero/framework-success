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

// Coordenadas de ejemplo (CABA)
$lat = -34.6037;
$lng = -58.3816;

// Paso 1: buscar sucursales
$sucursales = getSucursales($lat, $lng);
if (!empty($sucursales) && isset($sucursales[0]['id'])) {
    $sucursalId = $sucursales[0]['id'];
    echo "Sucursal ID: $sucursalId\n";

    // Paso 2: buscar productos
    $productos = buscarProductos($sucursalId, 'leche');
    echo "Productos encontrados:\n";
    foreach ($productos as $producto) {
        echo "- " . $producto['producto']['descripcion'] . " - $" . $producto['precio'] . "\n";
    }
} else {
    echo "No se encontraron sucursales.\n";
}
?>
