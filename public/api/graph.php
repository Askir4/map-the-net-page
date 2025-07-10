<?php
header('Content-Type: application/json');
require_once 'db.php';

// Fetch all domains
$domains = $pdo->query('SELECT id, domain_name FROM domains')->fetchAll();
$domainMap = [];
foreach ($domains as $d) {
    $domainMap[$d['id']] = $d['domain_name'];
}
// Calculate degree for each domain
$degree = [];
foreach ($domains as $d) $degree[$d['id']] = 0;
$links = $pdo->query('SELECT source_domain_id, target_domain_id, relationship_type FROM relationships')->fetchAll();
foreach ($links as $l) {
    if (isset($degree[$l['source_domain_id']])) $degree[$l['source_domain_id']]++;
    if (isset($degree[$l['target_domain_id']])) $degree[$l['target_domain_id']]++;
}
$nodes = [];
foreach ($domains as $d) {
    $nodes[] = [
        'id' => $d['id'],
        'domain_name' => $d['domain_name'],
        'degree' => $degree[$d['id']],
    ];
}
$edges = [];
foreach ($links as $l) {
    $edges[] = [
        'source' => $l['source_domain_id'],
        'target' => $l['target_domain_id'],
        'type' => $l['relationship_type'],
    ];
}
echo json_encode(['nodes' => $nodes, 'links' => $edges]); 