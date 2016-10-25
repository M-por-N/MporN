<?php
//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");
$input = @json_decode(file_get_contents("php://input"));
$id = $token->data->id;
$situacao = 2;
$nova_situacao = 3;

/*Area de testes*
    $input = array("id"=>9);
    $input = (object) $input;
    $id = 4;
/**/


if($input == null or !isset($input->id)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}



try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $query = 'UPDATE trabalho SET situacao = :nova_situacao WHERE id_cliente = :id_cliente AND situacao = :situacao AND id = :id';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':nova_situacao',$nova_situacao, PDO::PARAM_INT);
    $stmt->bindParam(':id_cliente', $id, PDO::PARAM_INT);
    $stmt->bindParam(':situacao', $situacao, PDO::PARAM_INT);
    $stmt->bindParam(':id', $input->id, PDO::PARAM_INT);
    
    $result = $stmt->execute();
    
   
    
    if(!$result){
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
        exit;
    } else {
        echo json_encode(['resultado' => true]);
    }
    
} catch (PDOException $e) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel alterar a situação do trabalho"]);
}

$pdo = null;

exit;