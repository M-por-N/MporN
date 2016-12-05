<?php

// header('Content-type: application/json; charset=utf-8'); ERRO
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
$id = $token->data->id;


// converto o input em json; o "@" remove a mensagem de erro (caso existir)
$input = @json_decode(file_get_contents("php://input"));





try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $stmt = $pdo->prepare("SELECT 1 as campo from usuario u where u.senha = :senha and u.idUsuario = :id");
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->bindParam(':senha', hash('sha256', $input->senhaAntiga, false), PDO::PARAM_STR);
    $stmt->execute();
    $resultado = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $verifica = $resultado[0]['campo'];
    
    if($verifica == 1){
        
    $sqlFreelancer = "UPDATE usuario set senha = :senha where idUsuario = :id";
    $stmt = $pdo->prepare($sqlFreelancer);
    $stmt->bindParam(':id', $input->idUsuario, PDO::PARAM_STR);
    $stmt->bindParam(':senha', hash('sha256', $input->senhaNova, false), PDO::PARAM_STR);
    $stmt->execute();
    }
    else{
         echo json_encode(['resultado' => false, 'mensagem' => "Senha antiga inválida"]);
    }
    
    //TODO: verficar se o id é null
} catch(PDOException $e){
    //TODO: receber mensagem de erro do PDO
    echo json_encode(['resultado' => false, 'mensagem' => "Erro ao conectar com o Banco de Dados"]);
    exit;
}

