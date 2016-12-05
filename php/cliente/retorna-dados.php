<?php
//header('Content-type: application/json; charset=utf-8');

use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");

$id = $token->data->id;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
   
    $stmt = $pdo->prepare('SELECT * FROM cliente c inner join usuario u on c.idUsuario = u.idUsuario WHERE idCliente = :id');
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
    $stmt->execute();
    
    if($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        echo json_encode($row);
    } else {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro ao retornar dados do Banco de Dados']);
    }
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;
