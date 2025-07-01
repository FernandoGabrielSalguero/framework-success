<?php
function getSucursalesPorLocalidad($provincia, $localidad) {
    $provincia = urlencode($provincia);
    $localidad = urlencode($localidad);
    $url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?provincia=$provincia&localidad=$localidad&limit=5";

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
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Buscar precios - Precios Claros</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 2rem; background: #f4f4f4; }
        h1 { color: #007BFF; }
        form { background: #fff; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; }
        input, select { padding: 8px; margin: 5px 0; width: 100%; }
        button { padding: 10px 15px; background: #28a745; color: #fff; border: none; cursor: pointer; border-radius: 4px; }
        .producto { padding: 10px; margin-bottom: 10px; background: #fff; border: 1px solid #ccc; border-radius: 5px; }
    </style>
</head>
<body>

<h1>🛒 Buscar productos en Precios Claros</h1>
<form method="GET">
    <label>Provincia:</label>
    <input type="text" name="provincia" required placeholder="Ej: Buenos Aires">

    <label>Localidad:</label>
    <input type="text" name="localidad" required placeholder="Ej: Morón">

    <label>Producto:</label>
    <input type="text" name="producto" required placeholder="Ej: yerba, leche, arroz">

    <button type="submit">Buscar</button>
</form>

<?php
if (isset($_GET['provincia'], $_GET['localidad'], $_GET['producto'])) {
    $provincia = $_GET['provincia'];
    $localidad = $_GET['localidad'];
    $producto = $_GET['producto'];

    $sucursales = getSucursalesPorLocalidad($provincia, $localidad);

    if (!empty($sucursales) && isset($sucursales[0]['id'])) {
        $sucursal = $sucursales[0];
        $sucursalId = $sucursal['id'];
        echo "<h2>Sucursal: {$sucursal['nombre']} ({$sucursal['direccion']})</h2>";

        $productos = buscarProductos($sucursalId, $producto);

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
        echo "<p><strong>No se encontraron sucursales para esa provincia/localidad.</strong></p>";
    }
}
?>

</body>
</html>
