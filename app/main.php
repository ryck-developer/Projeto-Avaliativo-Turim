<?php

define('__ROOT__', dirname(dirname(__FILE__)));

$data = json_decode(file_get_contents('php://input'));
if ($_SERVER['REQUEST_METHOD'] === 'POST') _doPOST($data); else _doGET();


function _doPOST ($data){
    require_once(__ROOT__.'/app/db/schema.php');
    $db->gravar($data, $config);
}

function _doGET(){
    require_once(__ROOT__.'/app/db/schema.php');
    $db->ler($config);
}
