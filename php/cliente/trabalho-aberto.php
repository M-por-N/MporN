<?php
//header('Content-type: application/json; charset=utf-8');

use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");

$id = $token->data->id;
//$id = 1;
try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $stmt = $pdo->prepare('SELECT t.id, t.nome as trabalhoNome, t.descricao, p.nome as planoNome FROM trabalho t inner join plano p on t.id_plano=p.id  WHERE t.id_cliente = :cliente AND t.id_situacao = 1');
    $stmt->bindValue(':cliente', $id, PDO::PARAM_INT);
    
    $stmt->execute(); //TDOO: verficar por erros
    $trab = array();
    $trab['trabalhos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($trab);
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;