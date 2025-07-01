<?php
function getSucursales($lat, $lng, $limit = 10) {
    $url = "https://d3e6htiiul5ek9.cloudfront.net/prod/sucursales?lat=$lat&lng=$lng&limit=$limit";

    $headers = [
        'Accept: application/json, text/plain, */*',
        'Accept-Language: es-AR,es;q=0.9',
        'Connection: keep-alive',
        'Referer: https://www.preciosclaros.gob.ar/',
        'Origin: https://www.preciosclaros.gob.ar',
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
        CURLOPT_TIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER => $headers
    ]);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo "❌ Error cURL: " . curl_error($ch);
        curl_close($ch);
        return null;
    }

    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200) {
        echo "❌ Error HTTP: Código $http_code<br>";
        return null;
    }

    $data = json_decode($response, true);
    if (!isset($data['sucursales'])) {
        echo "❌ La respuesta no contiene sucursales válidas.<br>";
        return null;
    }

    return $data['sucursales'];
}

// Coordenadas (modificá según tu ciudad)
$lat = -32.9252;
$lng = -68.8443;
$sucursales = getSucursales($lat, $lng);

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sucursales Cercanas</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 2rem; background: #f0f0f0; }
        h1 { color: #222; }
        .sucursal {
            background: white;
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            border-left: 5px solid #007BFF;
        }
    </style>
</head>
<body>
<h1>🏪 Sucursales cercanas</h1>

<?php if (!empty($sucursales)): ?>
    <?php foreach ($sucursales as $s): ?>
        <div class="sucursal">
            <strong><?= htmlspecialchars($s['sucursalNombre']) ?></strong><br>
            Dirección: <?= htmlspecialchars($s['direccion']) ?><br>
            Localidad: <?= htmlspecialchars($s['localidad']) ?><br>
            Provincia: <?= htmlspecialchars($s['provincia']) ?><br>
            Distancia: <?= htmlspecialchars($s['distanciaDescripcion']) ?><br>
            Tipo: <?= htmlspecialchars($s['sucursalTipo']) ?><br>
            Bandera: <?= htmlspecialchars($s['banderaDescripcion']) ?>
        </div>
    <?php endforeach; ?>
<?php else: ?>
    <p><strong>No se encontraron sucursales disponibles.</strong></p>
<?php endif; ?>

</body>
</html>
