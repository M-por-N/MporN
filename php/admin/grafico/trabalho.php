<?php
//header('Content-type: application/json; charset=utf-8');

use \Firebase\JWT\JWT;
require_once("../../vendor/autoload.php");
require_once("../../config.php");
include("../../recebe-jwt.php");

$id = $token->data->id;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
   
    $stmt = $pdo->prepare('SELECT count(*) as valor from trabalho t where t.idSituacao = 1
                            union all
                            SELECT count(*) as valor from trabalho t where t.idSituacao = 2
                            union all
                            SELECT count(*) as valor from trabalho t where t.idSituacao = 3
                            union all
                            SELECT count(*) as valor from trabalho t where t.idSituacao = 4');

    $stmt->execute(); //TDOO: verficar por erros

    $trab = array();
    $trab['trabalho'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($trab);
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;
