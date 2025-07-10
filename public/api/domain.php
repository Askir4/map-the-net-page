<?php
header('Content-Type: application/json');
require_once 'db.php';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
if (!$id) { echo json_encode(['error'=>'No id']); exit; }
$stmt = $pdo->prepare('SELECT * FROM domains WHERE id = ?');
$stmt->execute([$id]);
$domain = $stmt->fetch();
echo json_encode($domain ?: ['error'=>'Not found']); 