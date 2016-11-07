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
    $stmt = $pdo->prepare('SELECT t.id, t.nome trabalhoNome, t.descricao, p.nome as planoNome, f.nome as freelancerNome, f.email, t.situacao 
                           FROM trabalho t inner join planos p on t.plano=p.id inner join freelancer f on t.id_freelancer = f.id
                           WHERE t.id_cliente = :cliente AND t.situacao = 1
                           order by t.situacao desc');
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