<?php

//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");
$input = @json_decode(file_get_contents("php://input"));

$id = $token->data->id;
$trab = $input->trabalho;
$avaliacao = $input->avaliacao;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
   
    $query = 'UPDATE trabalho SET idAvaliacao = :avaliacao WHERE idCliente = :id_cliente AND idTrabalho = :id';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':avaliacao', $avaliacao, PDO::PARAM_INT);
    $stmt->bindParam(':id_cliente', $id, PDO::PARAM_INT);
    $stmt->bindParam(':id', $trab, PDO::PARAM_INT);
   
    $result = $stmt->execute();
    
    if(!$result){
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
        exit;
    } else {
        echo json_encode(['resultado' => true]);
    }
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;