<?php
require_once("config.php");
//$id = $token->data->id;

try{
    $pdo = new PDO($config->bd->dsn, $config->bd->user, $config->bd->password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    if($config->debug) {
        //permite que mensagens de erro sejam mostradas
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
    }
   
    $stmt = $pdo->prepare('SELECT * FROM status');
    $stmt->execute();
    
    $dados = array();
    $dados['status'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $return = json_encode($dados);
    echo $return;
} catch (PDOException $e) {
    echo json_encode(['resultado' => false, 'mensagem' => 'Connection failed: ' . $e->getMessage()]);
}

$conn = null;

exit;