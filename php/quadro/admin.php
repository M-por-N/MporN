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

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    
    $stmt = $pdo->prepare('SELECT a.*, u.*, s.* 
                            from usuario u inner join admin a on a.idUsuario = u.idUsuario 
                            inner join status s on s.idStatus = u.idStatus 
                            where a.idAdmin = :id');
    
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    
    $stmt->execute();
    
    if($row = $stmt->fetch(PDO::FETCH_OBJ)) {
        echo json_encode($row);
    } else {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => 'Erro ao retornar dados do Banco de Dados']);
    }
    
    
} catch (PDOException $e) {
        //TODO: Enviar a mensagem de erro retornada pelo PDO
        echo json_encode(['resultado' => false, 'mensagem' => "Não foi possivel realizar o Cadastro"]);
}

$pdo = null;

exit;