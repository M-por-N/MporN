<?php
//header('Content-type: application/json; charset=utf-8');

require_once("../config.php");
$id = $token->data->id;

$input = @json_decode(file_get_contents("php://input"));

if($input == null or !isset($input->nome) or !isset($input->email) or !isset($input->cpfcnpj) 
        or !isset($input->senha)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->beginTransaction();
    
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
  
    
    $sqlUsuario = "INSERT INTO usuario (nomeUsuario, email, cpfcnpj, senha) VALUES (:nome, :email, :cpfcnpj, :senha)";
    
    $stmt = $pdo->prepare($sqlUsuario);
    $stmt->bindParam(':nome', $input->nome, PDO::PARAM_STR);
    $stmt->bindParam(':email', $input->email, PDO::PARAM_STR);
    $stmt->bindParam(':cpfcnpj', $input->cpfcnpj, PDO::PARAM_STR);
    $stmt->bindParam(':senha', hash('sha256', $input->senha, false), PDO::PARAM_STR);
    $stmt->execute();
    
    $id_usuario = $pdo->lastInsertId();
    
    if($id_usuario == 0) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro Usuário"]);
        exit;
    }
    
    
    
    $sqlCliente = "INSERT INTO cliente (idUsuario) VALUES (:idUsuario)";
    
    $cliente = $pdo->prepare($sqlCliente);
    $cliente->bindParam(':idUsuario', $id_usuario, PDO::PARAM_INT);
    $cliente->execute();
    
    $id_cliente = $pdo->lastInsertId();
    
    
    if($id_cliente == 0) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro do Cliente"]);
        exit;
    }
    
    echo json_encode(['resultado' => true]);
    
    
    $pdo->commit();
    
} catch (PDOException $e) {
    //TODO: Enviar a mensagem de erro retornada pelo PDO
    echo json_encode(['resultado' => false, 'mensagem' => 'Erro no Banco de Dados']);
}


$conn = null;

exit;
