<?php
//header('Content-type: application/json; charset=utf-8');

use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");

$input = @json_decode(file_get_contents("php://input"));

if($input == null or !isset($input->nomeUsuario) or !isset($input->email) or !isset($input->cpfcnpj) 
        or !isset($input->especialidade)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}

$id = $token->data->id;

function esp($pdo, $esp, $id){
    
    try {
        $sql = 'DELETE FROM freelancer_especialidade WHERE idFreelancer = :id';
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        foreach($esp as $num){
            $sql = 'INSERT INTO freelancer_especialidade(idFreelancer, idEspecialidade) VALUES (:id_free, :id_esp)';
            $stmt = $pdo->prepare($sql);
            $stmt ->bindParam(':id_free', $id, PDO::PARAM_INT);
            $stmt ->bindParam(':id_esp', $num, PDO::PARAM_INT);
            $stmt -> execute();
        }
        $pdo = null;
    } catch (PDOException $e) {
        //TODO: tratar exeção
    }
}

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $query = 'UPDATE usuario SET nomeUsuario = :nome, email = :email, cpfcnpj = :cpfcnpj';
    $query .= ' WHERE idUsuario = (SELECT idUsuario from freelancer where idFreelancer = :id)';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':nome',$input->nomeUsuario, PDO::PARAM_STR);
    $stmt->bindParam(':email', $input->email, PDO::PARAM_STR);
    $stmt->bindParam(':cpfcnpj', $input->cpfcnpj, PDO::PARAM_STR);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT, PDO::PARAM_STR);
    
    
    $result = $stmt->execute();
    
    esp($pdo, $input->especialidade, $id);
    
    if(!$result){
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
        exit;
    } else {
        echo json_encode(['resultado' => true]);
    }
    
} catch (PDOException $e) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro"]);
}

$pdo = null;

exit;