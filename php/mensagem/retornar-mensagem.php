<?php
//header('Content-type: application/json; charset=utf-8');

use \Firebase\JWT\JWT;
require_once("../vendor/autoload.php");
require_once("../config.php");
include("../recebe-jwt.php");
$input = @json_decode(file_get_contents("php://input"));

$id = $token->data->id;
$trabalho = $input->trabalho;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
    $stmt = $pdo->prepare('SELECT t.nome trabalhoNome, m.datahora, m.texto, if(m.idtusuario="C", "Cliente", "Freelancer") as usuario
                            FROM trabalho t inner join mensagem m on t.id = m.id_trabalho
                            WHERE t.id = :trabalho
                            order by m.datahora');
    $stmt->bindValue(':trabalho', $trabalho, PDO::PARAM_INT);
    
    $stmt->execute(); //TDOO: verficar por erros
    $trab = array();
    $trab['mensagens'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($trab);
    
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;