<?php
//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");

$input = @json_decode(file_get_contents("php://input"));

$id = $token->data->id;

/*Area de testes*
    $input = array("nome"=>"Novo Trabalho Bracobum","plano"=> 1 ,"descricao"=>"Site para apresentação da Empresa","detalhado"=>"Descrição detalhada Aqui!");
    $input = (object) $input;
    $id = 4;
/**/


if($input == null or !isset($input->nome) or !isset($input->plano) or !isset($input->descricao) or !isset($input->detalhado)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}



try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $query = 'INSERT INTO trabalho (nome, id_plano, descricao, id_cliente, id_situacao, detalhado) VALUES (:nome, :plano, :descricao, :id_cliente, 1, :detalhado)';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':nome',$input->nome, PDO::PARAM_STR);
    $stmt->bindParam(':plano', $input->plano, PDO::PARAM_INT);
    $stmt->bindParam(':descricao', $input->descricao, PDO::PARAM_STR);
    $stmt->bindParam(':id_cliente', $id, PDO::PARAM_INT, PDO::PARAM_STR);
    $stmt->bindParam(':detalhado',$input->detalhado, PDO::PARAM_STR);
    
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