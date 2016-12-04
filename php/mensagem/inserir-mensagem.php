<?php
//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");

$input = @json_decode(file_get_contents("php://input"));

$id = $token->data->id;

$mensagem = $input->mensagem;
$trab = $input->trabalho;
$idt = $input->idt;


if($input == null or !isset($input->trabalho) or !isset($input->mensagem)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}



try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $query = 'INSERT INTO mensagem (texto, idTrabalho, idtusuario) VALUES (:mensagem, :trabalho, :idt)';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':mensagem',$mensagem, PDO::PARAM_STR);
    $stmt->bindParam(':trabalho', $trab, PDO::PARAM_INT);
    $stmt->bindParam(':idt', $idt, PDO::PARAM_STR);

    
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
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel criar um novo Trabalho"]);
}

$pdo = null;

exit;