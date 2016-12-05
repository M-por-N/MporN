<?php
//header('Content-type: application/json; charset=utf-8');
use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");

$input = @json_decode(file_get_contents("php://input"));
//$input = array("nome"=>"Bracobom","email"=>"contato@bracomal.com.br","cpfcnpj"=>"04040224040","senha"=>"senha");
//$input = (object) $input;
$id = $token->data->id;
//$id = 1;

if($input == null or !isset($input->nomeTrabalho) or !isset($input->descricaoTrabalho) or !isset($input->idTrabalho)) {
    echo json_encode(['resultado' => false, 'mensagem' => "Requisição invalida"]);
    exit;
}



try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $query = 'UPDATE trabalho 
              SET nomeTrabalho = :nome, descricaoTrabalho = :descricao, detalhadoTrabalho = :detalhado';
 
    $query .= ' WHERE idTrabalho = :id ';
    
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':nome',$input->nomeTrabalho, PDO::PARAM_STR);
    $stmt->bindParam(':descricao', $input->descricaoTrabalho, PDO::PARAM_STR);
    $stmt->bindParam(':detalhado', $input->detalhadoTrabalho, PDO::PARAM_STR);
    $stmt->bindParam(':id', $input->idTrabalho, PDO::PARAM_INT, PDO::PARAM_STR);
    
    
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
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro"]);
}

$pdo = null;

exit;