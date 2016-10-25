<?php
//implementação para teste do frontend:
/**
header('Content-type: application/json; charset=utf-8');
echo json_encode(['planos' => [ 
        [ 'id' => 2, 'nome' => 'Trabalho 2', valor => 10.0, 'descricaoCurta' => 'asdasd' ],
        [ 'id' => 3, 'nome' => 'Trabalho 3', valor => 10.0, 'descricaoCurta' => 'asdasd' ],
        [ 'id' => 7, 'nome' => 'Trabalho 7', valor => 10.0, 'descricaoCurta' => 'asdasd' ]
        ]]);
exit;
/**/

//header('Content-type: application/json; charset=utf-8');

//use \Firebase\JWT\JWT;
//require_once("vendor/autoload.php");
require_once("config.php");
$id = $token->data->id;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
   
    $stmt = $pdo->prepare('SELECT * FROM planos');
    $stmt->execute();
    
    $dados = array();
    $dados['planos'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $return = json_encode($dados);
    echo $return;
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;