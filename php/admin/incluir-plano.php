<?php
//header('Content-type: application/json; charset=utf-8');

require_once("../config.php");
$id = $token->data->id;

$input = @json_decode(file_get_contents("php://input"));

if($input == null or !isset($input->nome) or !isset($input->descricao) or !isset($input->valor)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
  
    $sql = "INSERT INTO plano (nome, descricaocurta, valor) VALUES (:nome, :descricao, :valor)";
    
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome', $input->nome, PDO::PARAM_STR);
    $stmt->bindParam(':descricao', $input->descricao, PDO::PARAM_STR);
    $stmt->bindParam(':valor', $input->valor, PDO::PARAM_STR);
    $stmt->execute();
    
    $id_plano = $pdo->lastInsertId();
    
    if($id_plano == 0) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro"]);
        exit;
    }
    
    echo json_encode(['resultado' => true]);
    
} catch (PDOException $e) {
    //TODO: Enviar a mensagem de erro retornada pelo PDO
    echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
}

$conn = null;

exit;
