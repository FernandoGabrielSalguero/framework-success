<?php
$lat = -32.9252;
$lng = -68.8443;
$limit = 10;

$proxyUrl = "https://www.fernandosalguero.com/cdn/api_proxy_sucursales.php?lat=$lat&lng=$lng&limit=$limit";

$ch = curl_init($proxyUrl);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_SSL_VERIFYPEER => false
]);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
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

<?php if (isset($data['sucursales']) && count($data['sucursales']) > 0): ?>
    <?php foreach ($data['sucursales'] as $s): ?>
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
<?php elseif (isset($data['error'])): ?>
    <p><strong>⚠️ Error desde el proxy:</strong> <?= htmlspecialchars($data['error']) ?></p>
<?php else: ?>
    <p><strong>No se encontraron sucursales disponibles.</strong></p>
<?php endif; ?>

</body>
</html>
