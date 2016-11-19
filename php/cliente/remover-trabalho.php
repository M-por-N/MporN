<?php
//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");


$input = @json_decode(file_get_contents("php://input"));

$id = $token->data->id;


try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
  
    $sql = "DELETE FROM trabalho where id = :id and id_cliente = :id_cliente ";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':id_cliente', $id, PDO::PARAM_INT);
    $stmt->bindValue(':id', $input->trabalho, PDO::PARAM_INT);
    
    
    $result = $stmt->execute();
    
    //$stmt->commit();
    
    if(!$result){
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
        exit;
    } else {
        echo json_encode(['resultado' => true]);
    }
    
} catch (PDOException $e) {
    //TODO: Enviar a mensagem de erro retornada pelo PDO
    echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
}

$conn = null;

exit;
